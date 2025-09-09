'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if columns exist before adding them
    const tableDescription = await queryInterface.describeTable('courses');
    
    if (!tableDescription.intro_content_type) {
      await queryInterface.addColumn('courses', 'intro_content_type', {
        type: Sequelize.ENUM('video', 'pdf', 'url'),
        allowNull: true,
        defaultValue: 'video'
      });
    }

    if (!tableDescription.intro_file_id) {
      await queryInterface.addColumn('courses', 'intro_file_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'file_uploads',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }

    if (!tableDescription.external_url) {
      await queryInterface.addColumn('courses', 'external_url', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'intro_content_type');
    await queryInterface.removeColumn('courses', 'intro_file_id');
    await queryInterface.removeColumn('courses', 'external_url');
  }
};
