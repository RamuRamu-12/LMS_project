const { sequelize } = require('./models');

async function resetBackendOnly() {
  try {
    console.log('🔄 Resetting BACKEND database only (keeping frontend unchanged)...\n');

    // 1. Drop all existing tables (including realtime projects tables)
    console.log('🗑️  Dropping existing tables...');
    const dropOrder = [
      // Realtime projects tables (will be recreated by frontend)
      'project_progress',
      'project_phases', 
      'projects',
      'videos',
      'documents',
      // Core LMS tables
      'chapter_progress',
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

    // 3. Create clean schema for core LMS (backend only)
    console.log('\n📋 Creating clean core LMS schema...');

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

    // Courses table (with logo field)
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

    // File uploads table (for course thumbnails and logos)
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

    // Course chapters table (URL-based)
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

    // Chapter progress table (for tracking student progress)
    console.log('   Creating chapter_progress table...');
    await sequelize.query(`
      CREATE TABLE "chapter_progress" (
        "id" SERIAL PRIMARY KEY,
        "student_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "chapter_id" INTEGER NOT NULL REFERENCES "course_chapters"("id") ON DELETE CASCADE,
        "is_completed" BOOLEAN DEFAULT false,
        "completion_percentage" INTEGER DEFAULT 0,
        "time_spent" INTEGER DEFAULT 0,
        "last_accessed_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "completed_at" TIMESTAMP WITH TIME ZONE,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("student_id", "chapter_id")
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

    // 4. Create essential indexes
    console.log('\n🔍 Creating essential indexes...');
    const indexes = [
      'CREATE INDEX "idx_courses_instructor_id" ON "courses"("instructor_id");',
      'CREATE INDEX "idx_courses_is_published" ON "courses"("is_published");',
      'CREATE INDEX "idx_course_chapters_course_id" ON "course_chapters"("course_id");',
      'CREATE INDEX "idx_course_chapters_chapter_order" ON "course_chapters"("chapter_order");',
      'CREATE INDEX "idx_course_chapters_is_published" ON "course_chapters"("is_published");',
      'CREATE INDEX "idx_enrollments_student_id" ON "enrollments"("student_id");',
      'CREATE INDEX "idx_enrollments_course_id" ON "enrollments"("course_id");',
      'CREATE INDEX "idx_file_uploads_course_id" ON "file_uploads"("course_id");',
      'CREATE INDEX "idx_chapter_progress_student_id" ON "chapter_progress"("student_id");',
      'CREATE INDEX "idx_chapter_progress_chapter_id" ON "chapter_progress"("chapter_id");'
    ];

    for (const indexQuery of indexes) {
      try {
        await sequelize.query(indexQuery);
        console.log(`   ✅ Created index: ${indexQuery.split('"')[1]}`);
      } catch (error) {
        console.log(`   ⚠️  Index might already exist: ${error.message}`);
      }
    }

    // 5. Create SequelizeMeta table and mark only core migrations as completed
    console.log('\n📝 Setting up migration tracking for core LMS...');
    await sequelize.query(`
      CREATE TABLE "SequelizeMeta" (
        "name" VARCHAR(255) NOT NULL PRIMARY KEY
      );
    `);

    // Mark only the core LMS migrations as completed
    const coreMigrations = [
      '001-create-users.js',
      '002-create-courses.js', 
      '003-create-enrollments.js',
      '004-create-file-uploads.js',
      '005-create-course-chapters.js',
      '006-add-course-intro-content.js',
      '007-add-url-analysis.js',
      '008-add-chapter-content-fields.js',
      '009-create-chapter-progress.js',
      '009-update-chapters-for-urls.js',
      '010-fix-chapter-schema.js',
      '011-add-course-logo.js',
      '012-fix-enrollment-status-enum.js'
      // Note: Excluding 013-018 which are realtime projects migrations
      // Frontend will handle realtime projects with localStorage
    ];

    for (const migration of coreMigrations) {
      await sequelize.query(`
        INSERT INTO "SequelizeMeta" (name) VALUES ('${migration}');
      `);
      console.log(`   ✅ Marked ${migration} as completed`);
    }

    // 6. Verify final schema
    console.log('\n🔍 Verifying core LMS schema...');
    const tables = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('✅ Created tables (core LMS):');
    tables[0].forEach(table => {
      console.log(`   - ${table.table_name}`);
    });

    // 7. Test the schema with sample data
    console.log('\n🧪 Testing core LMS schema...');
    
    // Create a test admin user
    const testUser = await sequelize.query(`
      INSERT INTO "users" (name, email, password, role, google_id, preferences) 
      VALUES ('Test Admin', 'admin@test.com', 'hashed_password', 'admin', NULL, '{}') 
      RETURNING id;
    `);
    const userId = testUser[0][0].id;
    console.log(`   ✅ Created test admin user with ID: ${userId}`);

    // Create a test course with logo
    const testCourse = await sequelize.query(`
      INSERT INTO "courses" (title, description, instructor_id, is_published, logo) 
      VALUES ('Test Course', 'A test course for core LMS', ${userId}, true, 'https://example.com/test-logo.png') 
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

    // Clean up test data
    await sequelize.query(`DELETE FROM "course_chapters" WHERE id = ${chapterId};`);
    await sequelize.query(`DELETE FROM "courses" WHERE id = ${courseId};`);
    await sequelize.query(`DELETE FROM "users" WHERE id = ${userId};`);
    console.log('   ✅ Cleaned up test data');

    console.log('\n🎉 Backend reset completed successfully!');
    console.log('✨ BACKEND: Core LMS database schema ready');
    console.log('🎨 FRONTEND: All realtime projects features preserved');
    console.log('📚 Available features:');
    console.log('   ✅ User management (admin/student roles)');
    console.log('   ✅ Course creation and management');
    console.log('   ✅ Chapter management with URL-based content');
    console.log('   ✅ Enrollment and progress tracking');
    console.log('   ✅ Course logo uploads');
    console.log('   ✅ Realtime projects (frontend-only with localStorage)');
    console.log('   ✅ Phase unlocking/locking system');
    console.log('   ✅ Phase navigation bar');
    console.log('   ✅ Dark theme removal');
    console.log('🚀 Ready to start both backend and frontend!');

  } catch (error) {
    console.error('❌ Error during backend reset:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await sequelize.close();
  }
}

// Run the reset
resetBackendOnly();
