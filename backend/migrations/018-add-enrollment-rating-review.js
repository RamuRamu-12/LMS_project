'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Check if rating column exists
      const ratingColumnExists = await queryInterface.describeTable('enrollments')
        .then(columns => 'rating' in columns)
        .catch(() => false);

      // Check if review column exists
      const reviewColumnExists = await queryInterface.describeTable('enrollments')
        .then(columns => 'review' in columns)
        .catch(() => false);

      // Add rating column if it doesn't exist
      if (!ratingColumnExists) {
        await queryInterface.addColumn('enrollments', 'rating', {
          type: Sequelize.INTEGER,
          allowNull: true,
          validate: {
            min: 1,
            max: 5
          }
        });
        console.log('Added rating column to enrollments table');
      }

      // Add review column if it doesn't exist
      if (!reviewColumnExists) {
        await queryInterface.addColumn('enrollments', 'review', {
          type: Sequelize.TEXT,
          allowNull: true
        });
        console.log('Added review column to enrollments table');
      }

      console.log('Migration 018 completed successfully');
    } catch (error) {
      console.error('Migration 018 failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remove rating column
      await queryInterface.removeColumn('enrollments', 'rating');
      console.log('Removed rating column from enrollments table');

      // Remove review column
      await queryInterface.removeColumn('enrollments', 'review');
      console.log('Removed review column from enrollments table');

      console.log('Migration 018 rollback completed successfully');
    } catch (error) {
      console.error('Migration 018 rollback failed:', error);
      throw error;
    }
  }
};
