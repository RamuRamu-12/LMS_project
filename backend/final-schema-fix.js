const { sequelize } = require('./models');

async function finalSchemaFix() {
  try {
    console.log('🔧 Final schema fix - ensuring overview_video_url column exists...\n');

    // Check if overview_video_url column exists
    const [columns] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      AND column_name = 'overview_video_url'
    `);
    
    if (columns.length === 0) {
      console.log('🔧 Adding overview_video_url column...');
      await sequelize.query(`
        ALTER TABLE projects 
        ADD COLUMN overview_video_url TEXT
      `);
      console.log('✅ Added overview_video_url column');
    } else {
      console.log('✅ overview_video_url column already exists');
    }

    // Check if any camelCase versions still exist and remove them
    const [camelColumns] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      AND column_name IN ('overviewVideoUrl', 'brdVideoUrl', 'uiuxVideoUrl', 'architecturalVideoUrl', 'codeDevelopmentVideoUrl', 'testingVideoUrl', 'deploymentVideoUrl')
    `);
    
    for (const col of camelColumns) {
      console.log(`🔧 Removing camelCase column: ${col.column_name}`);
      await sequelize.query(`ALTER TABLE projects DROP COLUMN "${col.column_name}"`);
      console.log(`✅ Removed ${col.column_name}`);
    }

    // Test the query that was failing
    console.log('\n🧪 Testing the failing query...');
    try {
      const { Project } = require('./models');
      const projects = await Project.findAll({
        attributes: ['id', 'title', 'overviewVideoUrl']
      });
      console.log('✅ Query works! Found', projects.length, 'projects');
    } catch (error) {
      console.log('❌ Query still fails:', error.message);
      
      // If still failing, let's check what columns actually exist
      const [allColumns] = await sequelize.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'projects'
        AND column_name LIKE '%video%'
        ORDER BY column_name
      `);
      console.log('📋 Video-related columns:', allColumns.map(c => c.column_name));
    }

  } catch (error) {
    console.error('❌ Fix failed:', error.message);
  } finally {
    await sequelize.close();
  }
}

finalSchemaFix();
