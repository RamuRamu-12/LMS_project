'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('courses', 'logo', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Course logo/icon URL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'logo');
  }
};
