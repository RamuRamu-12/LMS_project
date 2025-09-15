const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    allowNull: false,
    defaultValue: 'intermediate'
  },
  estimatedDuration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Duration in hours'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    allowNull: false,
    defaultValue: 'active'
  },
  thumbnail: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL to project thumbnail image'
  },
  logo: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL to project logo image'
  },
  overviewVideoUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL to project overview video'
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Project category (e.g., Web Development, Data Science)'
  },
  technologies: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of technologies used in the project'
  },
  phases: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of project phases with their details'
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdBy: {
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
  tableName: 'projects',
  timestamps: true,
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['difficulty']
    },
    {
      fields: ['category']
    },
    {
      fields: ['isPublished']
    },
    {
      fields: ['createdBy']
    }
  ]
});

  // Define associations
  Project.associate = (models) => {
    // Project belongs to User (creator)
    Project.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
    
    // Project belongs to User (updater)
    Project.belongsTo(models.User, {
      foreignKey: 'updatedBy',
      as: 'updater'
    });
    
    // Project has many Documents
    Project.hasMany(models.Document, {
      foreignKey: 'projectId',
      as: 'documents',
      onDelete: 'CASCADE'
    });
  };

  return Project;
};