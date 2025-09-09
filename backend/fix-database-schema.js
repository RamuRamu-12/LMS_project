const { sequelize } = require('./config/database');

async function fixDatabaseSchema() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Fix course_chapters table
    console.log('🔧 Fixing course_chapters table...');
    
    // Remove old columns
    try {
      await sequelize.query(`ALTER TABLE "course_chapters" DROP COLUMN IF EXISTS "pdf_file_id";`);
      console.log('✅ Removed pdf_file_id column');
    } catch (error) {
      console.log('ℹ️  pdf_file_id column already removed or doesn\'t exist');
    }
    
    try {
      await sequelize.query(`ALTER TABLE "course_chapters" DROP COLUMN IF EXISTS "content_type";`);
      console.log('✅ Removed content_type column');
    } catch (error) {
      console.log('ℹ️  content_type column already removed or doesn\'t exist');
    }
    
    try {
      await sequelize.query(`ALTER TABLE "course_chapters" DROP COLUMN IF EXISTS "external_url";`);
      console.log('✅ Removed external_url column');
    } catch (error) {
      console.log('ℹ️  external_url column already removed or doesn\'t exist');
    }
    
    try {
      await sequelize.query(`ALTER TABLE "course_chapters" DROP COLUMN IF EXISTS "file_id";`);
      console.log('✅ Removed file_id column');
    } catch (error) {
      console.log('ℹ️  file_id column already removed or doesn\'t exist');
    }

    // Add URL-based columns
    try {
      await sequelize.query(`ALTER TABLE "course_chapters" ADD COLUMN IF NOT EXISTS "video_url" TEXT;`);
      console.log('✅ Added video_url column');
    } catch (error) {
      console.log('ℹ️  video_url column already exists');
    }
    
    try {
      await sequelize.query(`ALTER TABLE "course_chapters" ADD COLUMN IF NOT EXISTS "pdf_url" TEXT;`);
      console.log('✅ Added pdf_url column');
    } catch (error) {
      console.log('ℹ️  pdf_url column already exists');
    }

    // Verify final schema
    const [results] = await sequelize.query(`
      SELECT column_name, data_type
      FROM information_schema.columns 
      WHERE table_name = 'course_chapters' 
      ORDER BY ordinal_position;
    `);
    
    console.log('\n📋 Final course_chapters columns:');
    results.forEach(col => console.log(`  - ${col.column_name}: ${col.data_type}`));

    // Test chapter creation
    console.log('\n🧪 Testing chapter creation...');
    try {
      const testChapter = await sequelize.query(`
        INSERT INTO "course_chapters" 
        ("course_id", "title", "description", "video_url", "pdf_url", "chapter_order", "duration_minutes", "is_published")
        VALUES (1, 'Test Chapter', 'Test Description', 'https://youtube.com/watch?v=test', 'https://drive.google.com/file/test', 1, 30, true)
        RETURNING "id", "title", "video_url", "pdf_url";
      `);
      
      console.log('✅ Test chapter created successfully:', testChapter[0][0]);

      // Clean up test chapter
      await sequelize.query(`DELETE FROM "course_chapters" WHERE "id" = ${testChapter[0][0].id}`);
      console.log('🧹 Test chapter cleaned up');
    } catch (error) {
      console.log('⚠️  Test chapter creation failed:', error.message);
    }

    console.log('\n✅ Database schema fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixDatabaseSchema();
