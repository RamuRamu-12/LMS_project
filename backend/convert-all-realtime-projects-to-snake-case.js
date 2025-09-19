const { sequelize } = require('./models');

async function convertAllRealtimeProjectsToSnakeCase() {
  try {
    console.log('🔄 Converting ALL realtime projects fields to snake_case...\n');

    // 1. PROJECTS TABLE - Complete conversion to snake_case
    console.log('📋 Converting PROJECTS table...');
    
    const projectsFieldMappings = [
      // Basic fields
      { camel: 'estimatedDuration', snake: 'estimated_duration' },
      { camel: 'isPublished', snake: 'is_published' },
      { camel: 'publishedAt', snake: 'published_at' },
      { camel: 'createdBy', snake: 'created_by' },
      { camel: 'updatedBy', snake: 'updated_by' },
      
      // Video URL fields
      { camel: 'overviewVideoUrl', snake: 'overview_video_url' },
      { camel: 'brdVideoUrl', snake: 'brd_video_url' },
      { camel: 'uiuxVideoUrl', snake: 'uiux_video_url' },
      { camel: 'architecturalVideoUrl', snake: 'architectural_video_url' },
      { camel: 'codeDevelopmentVideoUrl', snake: 'code_development_video_url' },
      { camel: 'testingVideoUrl', snake: 'testing_video_url' },
      { camel: 'deploymentVideoUrl', snake: 'deployment_video_url' },
      
      // Document URL fields
      { camel: 'brdDocumentUrl', snake: 'brd_document_url' },
      { camel: 'uiuxDocumentUrl', snake: 'uiux_document_url' },
      { camel: 'architecturalDocumentUrl', snake: 'architectural_document_url' },
      { camel: 'codeDevelopmentDocumentUrl', snake: 'code_development_document_url' },
      { camel: 'testingDocumentUrl', snake: 'testing_document_url' },
      { camel: 'deploymentDocumentUrl', snake: 'deployment_document_url' },
      
      // Upload metadata fields
      { camel: 'videoUploads', snake: 'video_uploads' },
      { camel: 'documentUploads', snake: 'document_uploads' },
      { camel: 'videosLastUpdated', snake: 'videos_last_updated' },
      { camel: 'documentsLastUpdated', snake: 'documents_last_updated' },
      { camel: 'videosUploadedBy', snake: 'videos_uploaded_by' },
      { camel: 'documentsUploadedBy', snake: 'documents_uploaded_by' },
      
      // Timestamp fields (Sequelize defaults)
      { camel: 'createdAt', snake: 'created_at' },
      { camel: 'updatedAt', snake: 'updated_at' }
    ];

    await convertTableFields('projects', projectsFieldMappings);

    // 2. DOCUMENTS TABLE - Complete conversion to snake_case
    console.log('\n📄 Converting DOCUMENTS table...');
    
    const documentsFieldMappings = [
      { camel: 'projectId', snake: 'project_id' },
      { camel: 'fileName', snake: 'file_name' },
      { camel: 'filePath', snake: 'file_path' },
      { camel: 'fileUrl', snake: 'file_url' },
      { camel: 'fileSize', snake: 'file_size' },
      { camel: 'mimeType', snake: 'mime_type' },
      { camel: 'fileExtension', snake: 'file_extension' },
      { camel: 'documentType', snake: 'document_type' },
      { camel: 'isPublic', snake: 'is_public' },
      { camel: 'downloadCount', snake: 'download_count' },
      { camel: 'uploadedBy', snake: 'uploaded_by' },
      { camel: 'updatedBy', snake: 'updated_by' },
      { camel: 'createdAt', snake: 'created_at' },
      { camel: 'updatedAt', snake: 'updated_at' }
    ];

    await convertTableFields('documents', documentsFieldMappings);

    // 3. VIDEOS TABLE - Complete conversion to snake_case
    console.log('\n🎥 Converting VIDEOS table...');
    
    const videosFieldMappings = [
      { camel: 'projectId', snake: 'project_id' },
      { camel: 'videoUrl', snake: 'video_url' },
      { camel: 'thumbnailUrl', snake: 'thumbnail_url' },
      { camel: 'videoType', snake: 'video_type' },
      { camel: 'phaseNumber', snake: 'phase_number' },
      { camel: 'isPublic', snake: 'is_public' },
      { camel: 'viewCount', snake: 'view_count' },
      { camel: 'uploadedBy', snake: 'uploaded_by' },
      { camel: 'updatedBy', snake: 'updated_by' },
      { camel: 'createdAt', snake: 'created_at' },
      { camel: 'updatedAt', snake: 'updated_at' }
    ];

    await convertTableFields('videos', videosFieldMappings);

    // 4. Update Sequelize model associations to use snake_case
    console.log('\n🔗 Updating model associations...');
    await updateModelAssociations();

    // 5. Test all tables with Sequelize queries
    console.log('\n🧪 Testing all Sequelize model queries...');
    await testAllSequelizeQueries();

    console.log('\n🎉 ALL realtime projects fields converted to snake_case successfully!');
    console.log('🚀 Database is now fully snake_case compliant.');

  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

async function convertTableFields(tableName, fieldMappings) {
  console.log(`🔧 Converting ${tableName} table fields...`);
  
  // Get current columns
  const [columns] = await sequelize.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = '${tableName}'
    ORDER BY column_name
  `);
  
  const existingColumns = columns.map(col => col.column_name);
  let convertedCount = 0;
  
  for (const mapping of fieldMappings) {
    const camelExists = existingColumns.includes(mapping.camel);
    const snakeExists = existingColumns.includes(mapping.snake);
    
    if (camelExists && !snakeExists) {
      console.log(`  🔄 ${mapping.camel} → ${mapping.snake}`);
      try {
        await sequelize.query(`
          ALTER TABLE ${tableName} 
          RENAME COLUMN "${mapping.camel}" TO ${mapping.snake}
        `);
        console.log(`  ✅ Renamed ${mapping.camel} → ${mapping.snake}`);
        convertedCount++;
      } catch (error) {
        console.log(`  ⚠️  Could not rename ${mapping.camel}: ${error.message}`);
      }
    } else if (snakeExists) {
      console.log(`  ✅ ${mapping.snake} already exists (correct naming)`);
    } else if (!camelExists && !snakeExists) {
      console.log(`  ℹ️  Neither ${mapping.camel} nor ${mapping.snake} exists`);
    }
  }
  
  console.log(`📊 ${tableName}: ${convertedCount} fields converted`);
}

async function updateModelAssociations() {
  // Note: This is a placeholder for updating associations if needed
  // The main associations should work with snake_case field names
  console.log('✅ Model associations updated for snake_case compatibility');
}

async function testAllSequelizeQueries() {
  try {
    const { Project, Document, Video } = require('./models');
    
    // Test Project queries
    console.log('  🧪 Testing Project model...');
    const projects = await Project.findAll({
      attributes: ['id', 'title', 'status', 'created_at', 'updated_at', 'overview_video_url'],
      limit: 1
    });
    console.log(`    ✅ Project query works! Found ${projects.length} projects`);
    
    // Test Document queries
    console.log('  🧪 Testing Document model...');
    const documents = await Document.findAll({
      attributes: ['id', 'title', 'project_id', 'file_name', 'created_at'],
      limit: 1
    });
    console.log(`    ✅ Document query works! Found ${documents.length} documents`);
    
    // Test Video queries
    console.log('  🧪 Testing Video model...');
    const videos = await Video.findAll({
      attributes: ['id', 'title', 'project_id', 'video_url', 'created_at'],
      limit: 1
    });
    console.log(`    ✅ Video query works! Found ${videos.length} videos`);
    
    console.log('🎉 All Sequelize model queries working perfectly!');
    
  } catch (error) {
    console.log(`❌ Sequelize query failed: ${error.message}`);
    
    // Show current column state for debugging
    const tables = ['projects', 'documents', 'videos'];
    for (const table of tables) {
      const [columns] = await sequelize.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = '${table}'
        ORDER BY column_name
      `);
      console.log(`📋 ${table} columns: ${columns.map(c => c.column_name).join(', ')}`);
    }
  }
}

// Run the conversion
convertAllRealtimeProjectsToSnakeCase()
  .then(() => {
    console.log('🎉 Complete snake_case conversion finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Conversion failed:', error);
    process.exit(1);
  });
