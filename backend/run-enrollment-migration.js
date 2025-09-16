const { sequelize } = require('./models');

const runMigration = async () => {
  try {
    console.log('Starting enrollment rating/review migration...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Import and run the migration
    const migration = require('./migrations/018-add-enrollment-rating-review');
    
    // Run the up migration
    await migration.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    
    console.log('Enrollment migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
