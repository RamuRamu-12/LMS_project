const { sequelize } = require('./models');
const seedProjects = require('./seed-projects');

const runSeeding = async () => {
  try {
    console.log('Starting project seeding...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Run the seeding
    await seedProjects();
    
    console.log('Project seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

runSeeding();
