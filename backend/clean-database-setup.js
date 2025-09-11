const { sequelize } = require('./models');

async function cleanDatabaseSetup() {
  try {
    console.log('🧹 Starting clean database setup for URL-based system...\n');

    // 1. Drop all existing tables (in correct order)
    console.log('🗑️  Dropping existing tables...');
    const dropOrder = [
      'course_chapters',
      'enrollments', 
      'file_uploads',
      'courses',
      'users',
      'SequelizeMeta'
    ];

    for (const table of dropOrder) {
      try {
        await sequelize.query(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
        console.log(`   ✅ Dropped ${table}`);
      } catch (error) {
        console.log(`   ⚠️  Could not drop ${table}: ${error.message}`);
      }
    }

    // 2. Drop existing enum types
    console.log('\n🏷️  Dropping existing enum types...');
    const enumTypesToDrop = [
      'enum_courses_intro_content_type',
      'enum_users_role',
      'enum_courses_difficulty',
      'enum_enrollments_status'
    ];

    for (const enumType of enumTypesToDrop) {
      try {
        await sequelize.query(`DROP TYPE IF EXISTS "public"."${enumType}" CASCADE;`);
        console.log(`   ✅ Dropped ${enumType}`);
      } catch (error) {
        console.log(`   ⚠️  Could not drop ${enumType}: ${error.message}`);
      }
    }

    // 3. Create clean, minimal schema for URL-based system
    console.log('\n📋 Creating clean URL-based schema...');

    // First create ALL enum types
    console.log('   Creating all enum types...');
    const enumTypes = [
      {
        name: 'enum_users_role',
        values: ['admin', 'student']
      },
      {
        name: 'enum_courses_difficulty', 
        values: ['beginner', 'intermediate', 'advanced']
      },
      {
        name: 'enum_enrollments_status',
        values: ['enrolled', 'in_progress', 'completed', 'dropped']
      }
    ];

    for (const enumType of enumTypes) {
      await sequelize.query(`
        DO $$ BEGIN
          CREATE TYPE "public"."${enumType.name}" AS ENUM(${enumType.values.map(v => `'${v}'`).join(', ')});
        EXCEPTION WHEN duplicate_object THEN null;
        END $$;
      `);
      console.log(`     ✅ Created ${enumType.name}`);
    }

    // Users table
    console.log('   Creating users table...');
    await sequelize.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "google_id" VARCHAR(255) UNIQUE,
        "name" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255),
        "avatar" TEXT,
        "role" "public"."enum_users_role" DEFAULT 'student',
        "is_active" BOOLEAN DEFAULT true,
        "last_login" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "preferences" JSONB DEFAULT '{}',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Courses table (minimal for URL-based system)
    console.log('   Creating courses table...');
    await sequelize.query(`
      CREATE TABLE "courses" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "instructor_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "category" VARCHAR(100),
        "difficulty" "public"."enum_courses_difficulty" DEFAULT 'beginner',
        "estimated_duration" INTEGER DEFAULT 0,
        "thumbnail" TEXT,
        "logo" TEXT,
        "is_published" BOOLEAN DEFAULT false,
        "enrollment_count" INTEGER DEFAULT 0,
        "average_rating" DECIMAL(3,2) DEFAULT 0.00,
        "total_ratings" INTEGER DEFAULT 0,
        "prerequisites" INTEGER[] DEFAULT '{}',
        "learning_objectives" TEXT[] DEFAULT '{}',
        "tags" TEXT[] DEFAULT '{}',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // File uploads table (only for course thumbnails)
    console.log('   Creating file_uploads table...');
    await sequelize.query(`
      CREATE TABLE "file_uploads" (
        "id" SERIAL PRIMARY KEY,
        "course_id" INTEGER NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
        "filename" VARCHAR(255) NOT NULL,
        "original_name" VARCHAR(255) NOT NULL,
        "mimetype" VARCHAR(100) NOT NULL,
        "size" INTEGER NOT NULL,
        "url" TEXT NOT NULL,
        "s3_key" VARCHAR(500),
        "s3_bucket" VARCHAR(100),
        "download_count" INTEGER DEFAULT 0,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Course chapters table (URL-based only)
    console.log('   Creating course_chapters table...');
    await sequelize.query(`
      CREATE TABLE "course_chapters" (
        "id" SERIAL PRIMARY KEY,
        "course_id" INTEGER NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "video_url" TEXT,
        "pdf_url" TEXT,
        "chapter_order" INTEGER NOT NULL DEFAULT 1,
        "duration_minutes" INTEGER,
        "is_published" BOOLEAN DEFAULT true,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Enrollments table
    console.log('   Creating enrollments table...');
    await sequelize.query(`
      CREATE TABLE "enrollments" (
        "id" SERIAL PRIMARY KEY,
        "student_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "course_id" INTEGER NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
        "status" "public"."enum_enrollments_status" DEFAULT 'enrolled',
        "progress" INTEGER DEFAULT 0,
        "completed_chapters" INTEGER[] DEFAULT '{}',
        "enrolled_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "completed_at" TIMESTAMP WITH TIME ZONE,
        "last_accessed_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "rating" INTEGER CHECK (rating >= 1 AND rating <= 5),
        "review" TEXT,
        "time_spent" INTEGER DEFAULT 0,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("student_id", "course_id")
      );
    `);

    // 4. Add logo field to existing courses table (if it doesn't exist)
    console.log('\n🖼️  Adding logo field to courses table...');
    try {
      // Check if logo column already exists
      const logoColumnExists = await sequelize.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'courses' 
        AND column_name = 'logo';
      `);
      
      if (logoColumnExists[0].length === 0) {
        // Add logo column if it doesn't exist
        await sequelize.query(`
          ALTER TABLE "courses" 
          ADD COLUMN "logo" TEXT;
        `);
        console.log('   ✅ Added logo column to courses table');
      } else {
        console.log('   ✅ Logo column already exists in courses table');
      }
    } catch (error) {
      console.log(`   ⚠️  Could not add logo column: ${error.message}`);
    }

    // 5. Create essential indexes
    console.log('\n🔍 Creating essential indexes...');
    const indexes = [
      'CREATE INDEX "idx_courses_instructor_id" ON "courses"("instructor_id");',
      'CREATE INDEX "idx_courses_is_published" ON "courses"("is_published");',
      'CREATE INDEX "idx_course_chapters_course_id" ON "course_chapters"("course_id");',
      'CREATE INDEX "idx_course_chapters_chapter_order" ON "course_chapters"("chapter_order");',
      'CREATE INDEX "idx_course_chapters_is_published" ON "course_chapters"("is_published");',
      'CREATE INDEX "idx_enrollments_student_id" ON "enrollments"("student_id");',
      'CREATE INDEX "idx_enrollments_course_id" ON "enrollments"("course_id");',
      'CREATE INDEX "idx_file_uploads_course_id" ON "file_uploads"("course_id");'
    ];

    for (const indexQuery of indexes) {
      try {
        await sequelize.query(indexQuery);
        console.log(`   ✅ Created index: ${indexQuery.split('"')[1]}`);
      } catch (error) {
        console.log(`   ⚠️  Index might already exist: ${error.message}`);
      }
    }

    // 6. Create SequelizeMeta table and mark migrations as completed
    console.log('\n📝 Setting up migration tracking...');
    await sequelize.query(`
      CREATE TABLE "SequelizeMeta" (
        "name" VARCHAR(255) NOT NULL PRIMARY KEY
      );
    `);

    // Mark all migrations as completed
    const migrations = [
      '001-create-users.js',
      '002-create-courses.js', 
      '003-create-enrollments.js',
      '004-create-file-uploads.js',
      '005-create-course-chapters.js',
      '006-add-course-intro-content.js',
      '007-add-url-analysis.js',
      '008-add-chapter-content-fields.js',
      '009-update-chapters-for-urls.js',
      '010-fix-chapter-schema.js',
      '011-add-course-logo.js'
    ];

    for (const migration of migrations) {
      await sequelize.query(`
        INSERT INTO "SequelizeMeta" (name) VALUES ('${migration}');
      `);
      console.log(`   ✅ Marked ${migration} as completed`);
    }

    // 7. Verify final schema
    console.log('\n🔍 Verifying final schema...');
    const tables = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('✅ Created tables:');
    tables[0].forEach(table => {
      console.log(`   - ${table.table_name}`);
    });

    // Check course_chapters schema specifically
    const chaptersSchema = await sequelize.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'course_chapters' 
      ORDER BY ordinal_position;
    `);

    console.log('\n✅ Course chapters schema (URL-based):');
    chaptersSchema[0].forEach(col => {
      console.log(`   - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });

    // 8. Test the schema with a sample insert
    console.log('\n🧪 Testing schema with sample data...');
    
    // Create a test user
    const testUser = await sequelize.query(`
      INSERT INTO "users" (name, email, password, role, google_id, preferences) 
      VALUES ('Test Admin', 'admin@test.com', 'hashed_password', 'admin', NULL, '{}') 
      RETURNING id;
    `);
    const userId = testUser[0][0].id;
    console.log(`   ✅ Created test user with ID: ${userId}`);

    // Create a test course with logo
    const testCourse = await sequelize.query(`
      INSERT INTO "courses" (title, description, instructor_id, is_published, logo) 
      VALUES ('Test Course', 'A test course for URL-based content', ${userId}, true, 'https://example.com/test-logo.png') 
      RETURNING id;
    `);
    const courseId = testCourse[0][0].id;
    console.log(`   ✅ Created test course with ID: ${courseId}`);

    // Create a test chapter with URLs
    const testChapter = await sequelize.query(`
      INSERT INTO "course_chapters" (course_id, title, description, video_url, pdf_url, chapter_order) 
      VALUES (${courseId}, 'Test Chapter', 'A test chapter with URLs', 'https://youtube.com/watch?v=test', 'https://drive.google.com/file/test', 1) 
      RETURNING id;
    `);
    const chapterId = testChapter[0][0].id;
    console.log(`   ✅ Created test chapter with ID: ${chapterId}`);

    // Verify the test data
    const testResult = await sequelize.query(`
      SELECT c.title as course_title, c.logo as course_logo, ch.title as chapter_title, ch.video_url, ch.pdf_url 
      FROM "courses" c 
      JOIN "course_chapters" ch ON c.id = ch.course_id 
      WHERE c.id = ${courseId};
    `);

    console.log('\n✅ Test data verification:');
    console.log(`   Course: ${testResult[0][0].course_title}`);
    console.log(`   Course Logo: ${testResult[0][0].course_logo}`);
    console.log(`   Chapter: ${testResult[0][0].chapter_title}`);
    console.log(`   Video URL: ${testResult[0][0].video_url}`);
    console.log(`   PDF URL: ${testResult[0][0].pdf_url}`);

    // Clean up test data
    await sequelize.query(`DELETE FROM "course_chapters" WHERE id = ${chapterId};`);
    await sequelize.query(`DELETE FROM "courses" WHERE id = ${courseId};`);
    await sequelize.query(`DELETE FROM "users" WHERE id = ${userId};`);
    console.log('   ✅ Cleaned up test data');

    console.log('\n🎉 Clean database setup completed successfully!');
    console.log('✨ Your database is now ready for the URL-based content system.');
    console.log('🚀 You can now create courses with video and PDF URLs.');
    console.log('🖼️  Course logo upload feature is now available!');
    console.log('📝 All migrations are marked as completed.');

  } catch (error) {
    console.error('❌ Error during clean database setup:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await sequelize.close();
  }
}

// Run the clean setup
cleanDatabaseSetup();
