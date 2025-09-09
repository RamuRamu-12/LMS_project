const { Enrollment, Course, User } = require('../models');
const logger = require('../utils/logger');
const { AppError } = require('../middleware/errorHandler');

/**
 * Get my enrollments
 */
const getMyEnrollments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: enrollments } = await Enrollment.findAndCountAll({
      where: { student_id: req.user.id },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'description', 'thumbnail', 'category', 'difficulty', 'estimated_duration']
        }
      ],
      order: [['enrolled_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      message: 'Enrollments retrieved successfully',
      data: {
        enrollments: enrollments.map(enrollment => ({
          id: enrollment.id,
          status: enrollment.status,
          progress: enrollment.progress,
          enrolled_at: enrollment.enrolled_at,
          completed_at: enrollment.completed_at,
          last_accessed_at: enrollment.last_accessed_at,
          time_spent: enrollment.time_spent,
          course: enrollment.course.getPublicInfo()
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get my enrollments error:', error);
    next(error);
  }
};

/**
 * Get my progress overview
 */
const getMyProgress = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { student_id: req.user.id },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'category']
        }
      ]
    });

    const stats = {
      totalEnrolled: enrollments.length,
      completed: enrollments.filter(e => e.status === 'completed').length,
      inProgress: enrollments.filter(e => e.status === 'in-progress').length,
      enrolled: enrollments.filter(e => e.status === 'enrolled').length,
      averageProgress: enrollments.length > 0 
        ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
        : 0,
      totalTimeSpent: enrollments.reduce((sum, e) => sum + (e.time_spent || 0), 0)
    };

    const categoryStats = {};
    enrollments.forEach(enrollment => {
      const category = enrollment.course.category;
      if (!categoryStats[category]) {
        categoryStats[category] = {
          total: 0,
          completed: 0,
          averageProgress: 0
        };
      }
      categoryStats[category].total++;
      if (enrollment.status === 'completed') {
        categoryStats[category].completed++;
      }
    });

    // Calculate average progress per category
    Object.keys(categoryStats).forEach(category => {
      const categoryEnrollments = enrollments.filter(e => e.course.category === category);
      categoryStats[category].averageProgress = categoryEnrollments.length > 0
        ? Math.round(categoryEnrollments.reduce((sum, e) => sum + e.progress, 0) / categoryEnrollments.length)
        : 0;
    });

    res.json({
      success: true,
      message: 'Progress retrieved successfully',
      data: {
        stats,
        categoryStats,
        recentEnrollments: enrollments
          .sort((a, b) => new Date(b.enrolled_at) - new Date(a.enrolled_at))
          .slice(0, 5)
          .map(enrollment => ({
            id: enrollment.id,
            course: enrollment.course.title,
            progress: enrollment.progress,
            status: enrollment.status,
            enrolled_at: enrollment.enrolled_at
          }))
      }
    });
  } catch (error) {
    logger.error('Get my progress error:', error);
    next(error);
  }
};

/**
 * Get my completed courses
 */
const getMyCompletedCourses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: enrollments } = await Enrollment.findAndCountAll({
      where: { 
        student_id: req.user.id,
        status: 'completed'
      },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'description', 'thumbnail', 'category', 'difficulty']
        }
      ],
      order: [['completed_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      message: 'Completed courses retrieved successfully',
      data: {
        enrollments: enrollments.map(enrollment => ({
          id: enrollment.id,
          progress: enrollment.progress,
          completed_at: enrollment.completed_at,
          time_spent: enrollment.time_spent,
          rating: enrollment.rating,
          review: enrollment.review,
          course: enrollment.course.getPublicInfo()
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get my completed courses error:', error);
    next(error);
  }
};

/**
 * Get my active courses
 */
const getMyActiveCourses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: enrollments } = await Enrollment.findAndCountAll({
      where: { 
        student_id: req.user.id,
        status: ['enrolled', 'in-progress']
      },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'description', 'thumbnail', 'category', 'difficulty', 'estimated_duration']
        }
      ],
      order: [['last_accessed_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      message: 'Active courses retrieved successfully',
      data: {
        enrollments: enrollments.map(enrollment => ({
          id: enrollment.id,
          status: enrollment.status,
          progress: enrollment.progress,
          enrolled_at: enrollment.enrolled_at,
          last_accessed_at: enrollment.last_accessed_at,
          time_spent: enrollment.time_spent,
          course: enrollment.course.getPublicInfo()
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get my active courses error:', error);
    next(error);
  }
};

/**
 * Get my learning statistics
 */
const getMyStats = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { student_id: req.user.id },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title', 'category', 'difficulty']
        }
      ]
    });

    const stats = {
      totalCourses: enrollments.length,
      completedCourses: enrollments.filter(e => e.status === 'completed').length,
      inProgressCourses: enrollments.filter(e => e.status === 'in-progress').length,
      enrolledCourses: enrollments.filter(e => e.status === 'enrolled').length,
      totalTimeSpent: enrollments.reduce((sum, e) => sum + (e.time_spent || 0), 0),
      averageProgress: enrollments.length > 0 
        ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
        : 0,
      completionRate: enrollments.length > 0 
        ? Math.round((enrollments.filter(e => e.status === 'completed').length / enrollments.length) * 100)
        : 0
    };

    // Category breakdown
    const categoryBreakdown = {};
    enrollments.forEach(enrollment => {
      const category = enrollment.course.category;
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = {
          total: 0,
          completed: 0,
          inProgress: 0,
          averageProgress: 0
        };
      }
      categoryBreakdown[category].total++;
      if (enrollment.status === 'completed') {
        categoryBreakdown[category].completed++;
      } else if (enrollment.status === 'in-progress') {
        categoryBreakdown[category].inProgress++;
      }
    });

    // Calculate average progress per category
    Object.keys(categoryBreakdown).forEach(category => {
      const categoryEnrollments = enrollments.filter(e => e.course.category === category);
      categoryBreakdown[category].averageProgress = categoryEnrollments.length > 0
        ? Math.round(categoryEnrollments.reduce((sum, e) => sum + e.progress, 0) / categoryEnrollments.length)
        : 0;
    });

    // Difficulty breakdown
    const difficultyBreakdown = {};
    enrollments.forEach(enrollment => {
      const difficulty = enrollment.course.difficulty;
      if (!difficultyBreakdown[difficulty]) {
        difficultyBreakdown[difficulty] = {
          total: 0,
          completed: 0,
          averageProgress: 0
        };
      }
      difficultyBreakdown[difficulty].total++;
      if (enrollment.status === 'completed') {
        difficultyBreakdown[difficulty].completed++;
      }
    });

    // Calculate average progress per difficulty
    Object.keys(difficultyBreakdown).forEach(difficulty => {
      const difficultyEnrollments = enrollments.filter(e => e.course.difficulty === difficulty);
      difficultyBreakdown[difficulty].averageProgress = difficultyEnrollments.length > 0
        ? Math.round(difficultyEnrollments.reduce((sum, e) => sum + e.progress, 0) / difficultyEnrollments.length)
        : 0;
    });

    res.json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: {
        stats,
        categoryBreakdown,
        difficultyBreakdown
      }
    });
  } catch (error) {
    logger.error('Get my stats error:', error);
    next(error);
  }
};

/**
 * Update my progress
 */
const updateMyProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { progress, time_spent } = req.body;

    const enrollment = await Enrollment.findOne({
      where: {
        id: id,
        student_id: req.user.id
      }
    });

    if (!enrollment) {
      throw new AppError('Enrollment not found', 404);
    }

    if (progress !== undefined) {
      await enrollment.updateProgress(progress);
    }

    if (time_spent !== undefined) {
      await enrollment.addTimeSpent(time_spent);
    }

    logger.info(`User ${req.user.email} updated progress for enrollment ${id}`);

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        enrollment: {
          id: enrollment.id,
          progress: enrollment.progress,
          status: enrollment.status,
          time_spent: enrollment.time_spent
        }
      }
    });
  } catch (error) {
    logger.error('Update my progress error:', error);
    next(error);
  }
};

/**
 * Complete course
 */
const completeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findOne({
      where: {
        id: id,
        student_id: req.user.id
      }
    });

    if (!enrollment) {
      throw new AppError('Enrollment not found', 404);
    }

    await enrollment.complete();

    // Update course enrollment count
    const course = await Course.findByPk(enrollment.course_id);
    if (course) {
      await course.updateEnrollmentCount();
    }

    logger.info(`User ${req.user.email} completed course`);

    res.json({
      success: true,
      message: 'Course completed successfully',
      data: {
        enrollment: {
          id: enrollment.id,
          status: enrollment.status,
          progress: enrollment.progress,
          completed_at: enrollment.completed_at
        }
      }
    });
  } catch (error) {
    logger.error('Complete course error:', error);
    next(error);
  }
};

/**
 * Drop course
 */
const dropCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findOne({
      where: {
        id: id,
        student_id: req.user.id
      }
    });

    if (!enrollment) {
      throw new AppError('Enrollment not found', 404);
    }

    await enrollment.drop();

    // Update course enrollment count
    const course = await Course.findByPk(enrollment.course_id);
    if (course) {
      await course.updateEnrollmentCount();
    }

    logger.info(`User ${req.user.email} dropped course`);

    res.json({
      success: true,
      message: 'Course dropped successfully'
    });
  } catch (error) {
    logger.error('Drop course error:', error);
    next(error);
  }
};

/**
 * Get admin statistics
 */
const getAdminStats = async (req, res, next) => {
  try {
    // Get total enrollments
    const totalEnrollments = await Enrollment.count();
    
    // Get completed enrollments
    const completedEnrollments = await Enrollment.count({
      where: { status: 'completed' }
    });
    
    // Get active enrollments
    const activeEnrollments = await Enrollment.count({
      where: { status: 'enrolled' }
    });
    
    // Calculate completion rate
    const completionRate = totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0;
    
    // Get total students
    const totalStudents = await User.count({
      where: { role: 'student' }
    });
    
    // Get total courses
    const totalCourses = await Course.count();
    
    // Get published courses
    const publishedCourses = await Course.count({
      where: { is_published: true }
    });

    res.json({
      success: true,
      message: 'Admin statistics retrieved successfully',
      data: {
        stats: {
          totalEnrolled: totalEnrollments,
          totalCompleted: completedEnrollments,
          totalActive: activeEnrollments,
          completionRate: Math.round(completionRate * 100) / 100,
          totalStudents,
          totalCourses,
          publishedCourses
        }
      }
    });
  } catch (error) {
    logger.error('Get admin stats error:', error);
    next(error);
  }
};

module.exports = {
  getMyEnrollments,
  getMyProgress,
  getMyCompletedCourses,
  getMyActiveCourses,
  getMyStats,
  updateMyProgress,
  completeCourse,
  dropCourse,
  getAdminStats
};
