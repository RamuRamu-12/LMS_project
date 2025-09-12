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
  Project.hasMany(ProjectPhase, {
    foreignKey: 'projectId',
    as: 'phases',
    onDelete: 'CASCADE'
  });

  Project.hasMany(ProjectProgress, {
    foreignKey: 'projectId',
    as: 'progress',
    onDelete: 'CASCADE'
  });

  // ProjectPhase associations
  ProjectPhase.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project'
  });

  ProjectPhase.hasMany(ProjectProgress, {
    foreignKey: 'phaseId',
    as: 'progress',
    onDelete: 'CASCADE'
  });

  // ProjectProgress associations
  ProjectProgress.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  ProjectProgress.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project'
  });

  ProjectProgress.belongsTo(ProjectPhase, {
    foreignKey: 'phaseId',
    as: 'phase'
  });

  // User has many ProjectProgress
  User.hasMany(ProjectProgress, {
    foreignKey: 'userId',
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
  ProjectPhase,
  ProjectProgress
};
