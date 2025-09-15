const { sequelize } = require('./models');
const seedProjects = require('./seed-projects-db');
const logger = require('./utils/logger');

const setupProjectsDatabase = async () => {
  try {
    logger.info('Starting projects database setup...');
    
    // Test database connection
    await sequelize.authenticate();
    logger.info('Database connection established successfully');
    
    // Check if projects table already exists
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    const projectsTableExists = tableExists.includes('projects');
    
    if (!projectsTableExists) {
      logger.info('Projects table does not exist. Running migration...');
      
      // Run the migration manually
      const migration = require('./migrations/016-create-projects-and-documents');
      await migration.up(sequelize.getQueryInterface(), sequelize.constructor);
      
      logger.info('Migration completed successfully');
    } else {
      logger.info('Projects table already exists. Skipping table creation.');
    }
    
    // Seed projects
    await seedProjects();
    logger.info('Projects seeded successfully');
    
    logger.info('Projects database setup completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error setting up projects database:', error);
    process.exit(1);
  }
};

// Run the setup
setupProjectsDatabase();
