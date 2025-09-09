'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove old file-based columns
    await queryInterface.removeColumn('course_chapters', 'pdf_file_id');
    await queryInterface.removeColumn('course_chapters', 'content_type');
    await queryInterface.removeColumn('course_chapters', 'external_url');
    
    // Add URL-based columns if they don't exist
    const tableDescription = await queryInterface.describeTable('course_chapters');
    
    if (!tableDescription.video_url) {
      await queryInterface.addColumn('course_chapters', 'video_url', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }
    
    if (!tableDescription.pdf_url) {
      await queryInterface.addColumn('course_chapters', 'pdf_url', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Add back old columns
    await queryInterface.addColumn('course_chapters', 'pdf_file_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'file_uploads',
        key: 'id'
      }
    });
    
    await queryInterface.addColumn('course_chapters', 'content_type', {
      type: Sequelize.ENUM('video', 'pdf', 'url'),
      allowNull: false,
      defaultValue: 'video'
    });
    
    await queryInterface.addColumn('course_chapters', 'external_url', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
    // Remove URL-based columns
    await queryInterface.removeColumn('course_chapters', 'video_url');
    await queryInterface.removeColumn('course_chapters', 'pdf_url');
  }
};
