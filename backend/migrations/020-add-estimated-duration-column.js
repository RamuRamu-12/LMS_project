'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the estimated_duration column to courses table
    await queryInterface.addColumn('courses', 'estimated_duration', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Estimated duration of the course in hours'
    });
    
    console.log('✅ Added estimated_duration column to courses table');
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the estimated_duration column from courses table
    await queryInterface.removeColumn('courses', 'estimated_duration');
    
    console.log('✅ Removed estimated_duration column from courses table');
  }
};
