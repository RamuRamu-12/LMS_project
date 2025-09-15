const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: 'Drive URL or video URL'
    },
    thumbnailUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: 'Thumbnail image URL'
    },
    videoType: {
      type: DataTypes.ENUM('overview', 'phase'),
      allowNull: false,
      comment: 'Type of video: overview or phase-specific'
    },
    phase: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Phase name for phase-specific videos (e.g., BRD, UI/UX, etc.)'
    },
    phaseNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Phase number for phase-specific videos'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Video duration in seconds'
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Whether video is publicly accessible'
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'Number of times video has been viewed'
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Array of tags for categorization'
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    tableName: 'videos',
    timestamps: true,
    indexes: [
      {
        fields: ['projectId']
      },
      {
        fields: ['videoType']
      },
      {
        fields: ['phase']
      },
      {
        fields: ['phaseNumber']
      },
      {
        fields: ['isPublic']
      },
      {
        fields: ['uploadedBy']
      }
    ]
  });

  // Define associations
  Video.associate = (models) => {
    // Video belongs to Project
    Video.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    
    // Video belongs to User (uploader)
    Video.belongsTo(models.User, {
      foreignKey: 'uploadedBy',
      as: 'uploader'
    });
    
    // Video belongs to User (updater)
    Video.belongsTo(models.User, {
      foreignKey: 'updatedBy',
      as: 'updater'
    });
  };

  return Video;
};
