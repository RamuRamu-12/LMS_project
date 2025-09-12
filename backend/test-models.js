const { sequelize, Project, ProjectPhase, ProjectProgress } = require('./models');

const testModels = async () => {
  try {
    console.log('Testing model imports...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Test model definitions
    console.log('✅ Project model:', Project.name);
    console.log('✅ ProjectPhase model:', ProjectPhase.name);
    console.log('✅ ProjectProgress model:', ProjectProgress.name);
    
    // Test table creation (sync)
    console.log('Creating tables...');
    await sequelize.sync({ force: false });
    console.log('✅ Tables created successfully');
    
    console.log('All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

testModels();
