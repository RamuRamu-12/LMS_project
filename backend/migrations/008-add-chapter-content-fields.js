'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if columns exist before adding them
    const tableDescription = await queryInterface.describeTable('course_chapters');
    
    if (!tableDescription.content_type) {
      await queryInterface.addColumn('course_chapters', 'content_type', {
        type: Sequelize.ENUM('video', 'pdf', 'url'),
        allowNull: true,
        defaultValue: 'video'
      });
    }

    if (!tableDescription.content_url) {
      await queryInterface.addColumn('course_chapters', 'content_url', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }

    if (!tableDescription.file_id) {
      await queryInterface.addColumn('course_chapters', 'file_id', {
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

    if (!tableDescription.embed_url) {
      await queryInterface.addColumn('course_chapters', 'embed_url', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }

    if (!tableDescription.url_analysis) {
      await queryInterface.addColumn('course_chapters', 'url_analysis', {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: null
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('course_chapters', 'content_type');
    await queryInterface.removeColumn('course_chapters', 'content_url');
    await queryInterface.removeColumn('course_chapters', 'file_id');
    await queryInterface.removeColumn('course_chapters', 'embed_url');
    await queryInterface.removeColumn('course_chapters', 'url_analysis');
  }
};
