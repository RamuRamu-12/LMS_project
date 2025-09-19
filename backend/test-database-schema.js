const { Project, Document, Video, sequelize } = require('./models');

async function testDatabaseSchema() {
  try {
    console.log('Testing database schema...\n');
    
    // Test Project table
    console.log('1. Testing Project table...');
    const projectColumns = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `, { type: sequelize.QueryTypes.SELECT });
    
    console.log('Project columns:', projectColumns.map(col => col.column_name));
    
    // Test Document table
    console.log('\n2. Testing Document table...');
    const documentColumns = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'documents' 
      ORDER BY ordinal_position;
    `, { type: sequelize.QueryTypes.SELECT });
    
    console.log('Document columns:', documentColumns.map(col => col.column_name));
    
    // Test Video table
    console.log('\n3. Testing Video table...');
    const videoColumns = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'videos' 
      ORDER BY ordinal_position;
    `, { type: sequelize.QueryTypes.SELECT });
    
    console.log('Video columns:', videoColumns.map(col => col.column_name));
    
    // Test a simple query
    console.log('\n4. Testing Project.findAll()...');
    const projects = await Project.findAll({
      attributes: ['id', 'title', 'is_published', 'created_at'],
      limit: 3
    });
    
    console.log('Projects found:', projects.length);
    console.log('Sample project:', projects[0] ? {
      id: projects[0].id,
      title: projects[0].title,
      is_published: projects[0].is_published,
      created_at: projects[0].created_at
    } : 'No projects found');
    
    console.log('\n✅ Database schema test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database schema test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await sequelize.close();
  }
}

testDatabaseSchema();
