const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
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
  fileName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Original filename'
  },
  filePath: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'Path to the uploaded file'
  },
  fileUrl: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'Public URL to access the file'
  },
  fileSize: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'File size in bytes'
  },
  mimeType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'MIME type of the file'
  },
  fileExtension: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'File extension (e.g., pdf, docx, zip)'
  },
  documentType: {
    type: DataTypes.ENUM('brd', 'uiux', 'architecture', 'code', 'testing', 'deployment', 'other'),
    allowNull: false,
    comment: 'Type of document based on project phase'
  },
  phase: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Specific phase within document type'
  },
  version: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '1.0',
    comment: 'Document version'
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'Whether document is publicly accessible'
  },
  downloadCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Number of times document has been downloaded'
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
  tableName: 'documents',
  timestamps: true,
  indexes: [
    {
      fields: ['projectId']
    },
    {
      fields: ['documentType']
    },
    {
      fields: ['phase']
    },
    {
      fields: ['isPublic']
    },
    {
      fields: ['uploadedBy']
    },
    {
      fields: ['mimeType']
    }
  ]
});

  // Define associations
  Document.associate = (models) => {
    // Document belongs to Project
    Document.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    
    // Document belongs to User (uploader)
    Document.belongsTo(models.User, {
      foreignKey: 'uploadedBy',
      as: 'uploader'
    });
    
    // Document belongs to User (updater)
    Document.belongsTo(models.User, {
      foreignKey: 'updatedBy',
      as: 'updater'
    });
  };

  return Document;
};
