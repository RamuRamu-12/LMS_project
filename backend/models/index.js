const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions || {},
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Course = require('./Course')(sequelize, Sequelize.DataTypes);
const Enrollment = require('./Enrollment')(sequelize, Sequelize.DataTypes);
const FileUpload = require('./FileUpload')(sequelize, Sequelize.DataTypes);
const CourseChapter = require('./CourseChapter')(sequelize, Sequelize.DataTypes);
const ChapterProgress = require('./ChapterProgress')(sequelize, Sequelize.DataTypes);
const Project = require('./Project')(sequelize, Sequelize.DataTypes);
const Document = require('./Document')(sequelize, Sequelize.DataTypes);
const Video = require('./Video')(sequelize, Sequelize.DataTypes);
const ProjectPhase = require('./ProjectPhase')(sequelize, Sequelize.DataTypes);
const ProjectProgress = require('./ProjectProgress')(sequelize, Sequelize.DataTypes);

// Define associations
const defineAssociations = () => {
  // User associations
  User.hasMany(Course, {
    foreignKey: 'instructor_id',
    as: 'courses',
    onDelete: 'CASCADE'
  });

  User.belongsToMany(Course, {
    through: Enrollment,
    foreignKey: 'student_id',
    otherKey: 'course_id',
    as: 'enrolledCourses'
  });

  // Course associations
  Course.belongsTo(User, {
    foreignKey: 'instructor_id',
    as: 'instructor'
  });

  Course.belongsToMany(User, {
    through: Enrollment,
    foreignKey: 'course_id',
    otherKey: 'student_id',
    as: 'students'
  });

  Course.hasMany(FileUpload, {
    foreignKey: 'course_id',
    as: 'files',
    onDelete: 'CASCADE'
  });


  Course.hasMany(CourseChapter, {
    foreignKey: 'course_id',
    as: 'chapters',
    onDelete: 'CASCADE'
  });

  Course.hasMany(Enrollment, {
    foreignKey: 'course_id',
    as: 'enrollments',
    onDelete: 'CASCADE'
  });

  // Enrollment associations
  Enrollment.belongsTo(User, {
    foreignKey: 'student_id',
    as: 'student'
  });

  Enrollment.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course'
  });

  // FileUpload associations
  FileUpload.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course'
  });

  // CourseChapter associations
  CourseChapter.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course'
  });

  CourseChapter.hasMany(ChapterProgress, {
    foreignKey: 'chapter_id',
    as: 'progress',
    onDelete: 'CASCADE'
  });

  // ChapterProgress associations
  ChapterProgress.belongsTo(Enrollment, {
    foreignKey: 'enrollment_id',
    as: 'enrollment'
  });

  ChapterProgress.belongsTo(CourseChapter, {
    foreignKey: 'chapter_id',
    as: 'chapter'
  });

  // Enrollment has many ChapterProgress
  Enrollment.hasMany(ChapterProgress, {
    foreignKey: 'enrollment_id',
    as: 'chapterProgress',
    onDelete: 'CASCADE'
  });

  // Project associations
  Project.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'creator'
  });
  
  Project.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'updater'
  });

  Project.hasMany(ProjectPhase, {
    foreignKey: 'project_id',
    as: 'projectPhases',
    onDelete: 'CASCADE'
  });

  Project.hasMany(ProjectProgress, {
    foreignKey: 'project_id',
    as: 'progress',
    onDelete: 'CASCADE'
  });

  Project.hasMany(Document, {
    foreignKey: 'project_id',
    as: 'documents',
    onDelete: 'CASCADE'
  });

  Project.hasMany(Video, {
    foreignKey: 'project_id',
    as: 'videos',
    onDelete: 'CASCADE'
  });

  // Document associations
  Document.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project'
  });
  
  Document.belongsTo(User, {
    foreignKey: 'uploaded_by',
    as: 'uploader'
  });
  
  Document.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'updater'
  });

  // Video associations
  Video.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project'
  });
  
  Video.belongsTo(User, {
    foreignKey: 'uploaded_by',
    as: 'uploader'
  });
  
  Video.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'updater'
  });

  // ProjectPhase associations
  ProjectPhase.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project'
  });

  ProjectPhase.hasMany(ProjectProgress, {
    foreignKey: 'phase_id',
    as: 'progress',
    onDelete: 'CASCADE'
  });

  // ProjectProgress associations
  ProjectProgress.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  ProjectProgress.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project'
  });

  ProjectProgress.belongsTo(ProjectPhase, {
    foreignKey: 'phase_id',
    as: 'phase'
  });

  // User has many ProjectProgress
  User.hasMany(ProjectProgress, {
    foreignKey: 'user_id',
    as: 'projectProgress',
    onDelete: 'CASCADE'
  });

};

// Define associations
defineAssociations();

// Export models and sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Course,
  Enrollment,
  FileUpload,
  CourseChapter,
  ChapterProgress,
  Project,
  Document,
  Video,
  ProjectPhase,
  ProjectProgress
};
