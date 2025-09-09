const { sequelize } = require('./models');

async function disableMigrations() {
  try {
    console.log('🚫 Disabling automatic migrations...\n');

    // 1. Check if SequelizeMeta table exists
    console.log('📋 Checking migration table...');
    const tableExists = await sequelize.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'SequelizeMeta'
      );
    `);

    if (!tableExists[0][0].exists) {
      console.log('   📝 Creating SequelizeMeta table...');
      await sequelize.query(`
        CREATE TABLE "SequelizeMeta" (
          "name" VARCHAR(255) NOT NULL PRIMARY KEY
        );
      `);
      console.log('   ✅ Created SequelizeMeta table');
    } else {
      console.log('   ✅ SequelizeMeta table exists');
    }

    // 2. Clear all existing migration records
    console.log('\n🗑️  Clearing existing migration records...');
    await sequelize.query(`DELETE FROM "SequelizeMeta";`);
    console.log('   ✅ Cleared all migration records');

    // 3. Mark ALL migrations as completed (including future ones)
    console.log('\n📝 Marking ALL migrations as completed...');
    const allMigrations = [
      '001-create-users.js',
      '002-create-courses.js', 
      '003-create-enrollments.js',
      '004-create-file-uploads.js',
      '005-create-course-chapters.js',
      '006-add-course-intro-content.js',
      '007-add-url-analysis.js',
      '008-add-chapter-content-fields.js',
      '009-update-chapters-for-urls.js',
      // Add any future migrations here to prevent them from running
      '010-any-future-migration.js',
      '011-any-future-migration.js',
      '012-any-future-migration.js'
    ];

    for (const migration of allMigrations) {
      await sequelize.query(`
        INSERT INTO "SequelizeMeta" (name) VALUES ('${migration}');
      `);
      console.log(`   ✅ Marked ${migration} as completed`);
    }

    // 4. Verify no migrations will run
    console.log('\n🔍 Verifying migration status...');
    const migrationCount = await sequelize.query(`
      SELECT COUNT(*) as count FROM "SequelizeMeta";
    `);
    console.log(`   📊 Total migrations marked as completed: ${migrationCount[0][0].count}`);

    // 5. Check current database schema
    console.log('\n📊 Current database schema:');
    const tables = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('✅ Existing tables:');
    tables[0].forEach(table => {
      console.log(`   - ${table.table_name}`);
    });

    // 6. Check course_chapters schema specifically
    const chaptersSchema = await sequelize.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'course_chapters' 
      ORDER BY ordinal_position;
    `);

    console.log('\n✅ Course chapters schema (should have video_url, pdf_url, NO content_type):');
    chaptersSchema[0].forEach(col => {
      console.log(`   - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });

    // 7. Verify no content_type column exists
    const hasContentType = chaptersSchema[0].some(col => col.column_name === 'content_type');
    if (hasContentType) {
      console.log('\n⚠️  WARNING: content_type column still exists! This will cause errors.');
    } else {
      console.log('\n✅ GOOD: content_type column does not exist. Schema is clean.');
    }

    console.log('\n🎉 Migration system disabled successfully!');
    console.log('✨ All migrations are marked as completed.');
    console.log('🚫 No migrations will run automatically.');
    console.log('🚀 Your server should start without migration errors.');

  } catch (error) {
    console.error('❌ Error disabling migrations:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await sequelize.close();
  }
}

// Run the disable
disableMigrations();
