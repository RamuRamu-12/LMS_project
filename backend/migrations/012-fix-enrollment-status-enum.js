'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, let's check what the current enum values are
    const [results] = await queryInterface.sequelize.query(`
      SELECT column_name, column_type 
      FROM information_schema.columns 
      WHERE table_name = 'enrollments' 
      AND column_name = 'status'
    `);
    
    console.log('Current status column type:', results[0]?.column_type);

    // Drop the existing enum and recreate it with the correct values
    await queryInterface.changeColumn('enrollments', 'status', {
      type: Sequelize.ENUM('enrolled', 'completed', 'dropped'),
      defaultValue: 'enrolled',
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to the original enum values if needed
    await queryInterface.changeColumn('enrollments', 'status', {
      type: Sequelize.ENUM('enrolled', 'completed', 'dropped'),
      defaultValue: 'enrolled',
      allowNull: false
    });
  }
};
