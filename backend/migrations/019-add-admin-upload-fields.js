'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add video URL fields to projects table for each phase
    await queryInterface.addColumn('projects', 'overviewVideoUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Project overview video URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'brdVideoUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'BRD phase video URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'uiuxVideoUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'UI/UX phase video URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'architecturalVideoUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Architectural phase video URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'codeDevelopmentVideoUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Code Development phase video URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'testingVideoUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Testing phase video URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'deploymentVideoUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Deployment phase video URL (Drive link)'
    });

    // Add document URL fields to projects table for each phase
    await queryInterface.addColumn('projects', 'brdDocumentUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'BRD phase document URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'uiuxDocumentUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'UI/UX phase document URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'architecturalDocumentUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Architectural phase document URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'codeDevelopmentDocumentUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Code Development phase document URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'testingDocumentUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Testing phase document URL (Drive link)'
    });

    await queryInterface.addColumn('projects', 'deploymentDocumentUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Deployment phase document URL (Drive link)'
    });

    // Add metadata fields for tracking uploads
    await queryInterface.addColumn('projects', 'videoUploads', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: 'Metadata for video uploads (upload dates, file sizes, etc.)'
    });

    await queryInterface.addColumn('projects', 'documentUploads', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: 'Metadata for document uploads (upload dates, file sizes, etc.)'
    });

    // Add last updated fields for tracking
    await queryInterface.addColumn('projects', 'videosLastUpdated', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Last time videos were updated'
    });

    await queryInterface.addColumn('projects', 'documentsLastUpdated', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Last time documents were updated'
    });

    // Add uploaded by fields for tracking who uploaded the content
    await queryInterface.addColumn('projects', 'videosUploadedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      comment: 'User who uploaded the videos'
    });

    await queryInterface.addColumn('projects', 'documentsUploadedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      comment: 'User who uploaded the documents'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all added columns
    const columnsToRemove = [
      'overviewVideoUrl',
      'brdVideoUrl',
      'uiuxVideoUrl',
      'architecturalVideoUrl',
      'codeDevelopmentVideoUrl',
      'testingVideoUrl',
      'deploymentVideoUrl',
      'brdDocumentUrl',
      'uiuxDocumentUrl',
      'architecturalDocumentUrl',
      'codeDevelopmentDocumentUrl',
      'testingDocumentUrl',
      'deploymentDocumentUrl',
      'videoUploads',
      'documentUploads',
      'videosLastUpdated',
      'documentsLastUpdated',
      'videosUploadedBy',
      'documentsUploadedBy'
    ];

    for (const column of columnsToRemove) {
      await queryInterface.removeColumn('projects', column);
    }
  }
};
