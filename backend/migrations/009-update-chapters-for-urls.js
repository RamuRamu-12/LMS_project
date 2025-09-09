'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new URL columns to course_chapters table
    await queryInterface.addColumn('course_chapters', 'video_url', {
      type: Sequelize.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    });

    await queryInterface.addColumn('course_chapters', 'pdf_url', {
      type: Sequelize.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    });

    // Remove old columns that are no longer needed
    await queryInterface.removeColumn('course_chapters', 'content_type');
    await queryInterface.removeColumn('course_chapters', 'content_url');
    await queryInterface.removeColumn('course_chapters', 'file_id');
    await queryInterface.removeColumn('course_chapters', 'embed_url');
    await queryInterface.removeColumn('course_chapters', 'url_analysis');
  },

  down: async (queryInterface, Sequelize) => {
    // Add back the old columns
    await queryInterface.addColumn('course_chapters', 'content_type', {
      type: Sequelize.ENUM('video', 'pdf', 'url'),
      allowNull: true,
      defaultValue: 'video'
    });

    await queryInterface.addColumn('course_chapters', 'content_url', {
      type: Sequelize.TEXT,
      allowNull: true
    });

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

    await queryInterface.addColumn('course_chapters', 'embed_url', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('course_chapters', 'url_analysis', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: null
    });

    // Remove the new URL columns
    await queryInterface.removeColumn('course_chapters', 'video_url');
    await queryInterface.removeColumn('course_chapters', 'pdf_url');
  }
};
