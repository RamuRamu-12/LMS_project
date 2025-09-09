const { Course, User, Enrollment, CourseChapter } = require('../models');
const logger = require('../utils/logger');
const { AppError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

/**
 * Get all courses with filtering and pagination
 */
const getCourses = async (req, res, next) => {
  try {
    const { 
      q, 
      category, 
      difficulty, 
      page = 1, 
      limit = 10, 
      sort = 'created_at', 
      order = 'desc' 
    } = req.query;

    const offset = (page - 1) * limit;
    
    // If user is authenticated, show their unpublished courses too
    // Otherwise, only show published courses
    const whereClause = req.user 
      ? { 
          [Op.or]: [
            { is_published: true },
            { instructor_id: req.user.id }
          ]
        }
      : { is_published: true };

    // Apply filters
    if (category) whereClause.category = category;
    if (difficulty) whereClause.difficulty = difficulty;
    if (q) {
      const searchCondition = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
          { tags: { [Op.contains]: [q] } }
        ]
      };
      
      if (whereClause[Op.or]) {
        whereClause[Op.and] = [
          whereClause,
          searchCondition
        ];
        delete whereClause[Op.or];
      } else {
        Object.assign(whereClause, searchCondition);
      }
    }

    const { count, rows: courses } = await Course.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: CourseChapter,
          as: 'chapters',
          attributes: ['id', 'title', 'description', 'video_url', 'pdf_url', 'chapter_order', 'duration_minutes', 'is_published'],
          order: [['chapter_order', 'ASC']]
        }
      ],
      order: [[sort, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      message: 'Courses retrieved successfully',
      data: {
        courses: courses.map(course => course.getPublicInfo()),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get courses error:', error);
    next(error);
  }
};

/**
 * Search courses
 */
const searchCourses = async (req, res, next) => {
  try {
    const { q, category, difficulty, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.json({
        success: true,
        message: 'Search query required',
        data: { courses: [], pagination: {} }
      });
    }

    const offset = (page - 1) * limit;
    const whereClause = {
      is_published: true,
      [Op.or]: [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
        { tags: { [Op.contains]: [q] } }
      ]
    };

    if (category) whereClause.category = category;
    if (difficulty) whereClause.difficulty = difficulty;

    const { count, rows: courses } = await Course.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      message: 'Search results retrieved successfully',
      data: {
        courses: courses.map(course => course.getPublicInfo()),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    logger.error('Search courses error:', error);
    next(error);
  }
};

/**
 * Get popular courses
 */
const getPopularCourses = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const courses = await Course.findAll({
      where: { is_published: true },
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      order: [['enrollment_count', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      message: 'Popular courses retrieved successfully',
      data: {
        courses: courses.map(course => course.getPublicInfo())
      }
    });
  } catch (error) {
    logger.error('Get popular courses error:', error);
    next(error);
  }
};

/**
 * Get top-rated courses
 */
const getTopRatedCourses = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const courses = await Course.findAll({
      where: { 
        is_published: true,
        total_ratings: { [Op.gte]: 1 }
      },
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      order: [['average_rating', 'DESC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      message: 'Top-rated courses retrieved successfully',
      data: {
        courses: courses.map(course => course.getPublicInfo())
      }
    });
  } catch (error) {
    logger.error('Get top-rated courses error:', error);
    next(error);
  }
};

/**
 * Get course by ID
 */
const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: CourseChapter,
          as: 'chapters',
          attributes: ['id', 'title', 'description', 'video_url', 'pdf_url', 'chapter_order', 'duration_minutes', 'is_published'],
          order: [['chapter_order', 'ASC']]
        }
      ]
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Check if user is enrolled (if authenticated)
    let enrollment = null;
    if (req.user) {
      enrollment = await Enrollment.findOne({
        where: {
          student_id: req.user.id,
          course_id: id
        }
      });
    }

    res.json({
      success: true,
      message: 'Course retrieved successfully',
      data: {
        course: course.getPublicInfo(),
        enrollment: enrollment ? {
          status: enrollment.status,
          progress: enrollment.progress,
          enrolled_at: enrollment.enrolled_at
        } : null
      }
    });
  } catch (error) {
    logger.error('Get course by ID error:', error);
    next(error);
  }
};

/**
 * Create new course
 */
const createCourse = async (req, res, next) => {
  try {
    // Clean learning objectives - filter out empty strings
    const cleanedLearningObjectives = req.body.learning_objectives 
      ? req.body.learning_objectives.filter(obj => obj && obj.trim() !== '')
      : [];

    const courseData = {
      ...req.body,
      learning_objectives: cleanedLearningObjectives,
      instructor_id: req.user.id
    };



    const course = await Course.create(courseData);

    logger.info(`Course "${course.title}" created by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: {
        course: course.getPublicInfo()
      }
    });
  } catch (error) {
    logger.error('Create course error:', error);
    next(error);
  }
};

/**
 * Update course
 */
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.instructor_id !== req.user.id) {
      throw new AppError('Access denied. You can only edit your own courses.', 403);
    }

    // Clean learning objectives - filter out empty strings
    const updateData = { ...req.body };
    if (updateData.learning_objectives) {
      updateData.learning_objectives = updateData.learning_objectives.filter(obj => obj && obj.trim() !== '');
    }

    await course.update(updateData);

    // Reload course with relationships to get updated data
    const updatedCourse = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'avatar']
        },
      ]
    });

    logger.info(`Course "${updatedCourse.title}" updated by ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: {
        course: updatedCourse.getPublicInfo()
      }
    });
  } catch (error) {
    logger.error('Update course error:', error);
    next(error);
  }
};

/**
 * Delete course
 */
const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.instructor_id !== req.user.id) {
      throw new AppError('Access denied. You can only delete your own courses.', 403);
    }


    await course.destroy();

    logger.info(`Course "${course.title}" deleted by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    logger.error('Delete course error:', error);
    next(error);
  }
};

/**
 * Publish course
 */
const publishCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.instructor_id !== req.user.id) {
      throw new AppError('Access denied. You can only publish your own courses.', 403);
    }

    await course.publish();

    logger.info(`Course "${course.title}" published by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Course published successfully',
      data: {
        course: course.getPublicInfo()
      }
    });
  } catch (error) {
    logger.error('Publish course error:', error);
    next(error);
  }
};

/**
 * Unpublish course
 */
const unpublishCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.instructor_id !== req.user.id) {
      throw new AppError('Access denied. You can only unpublish your own courses.', 403);
    }

    await course.unpublish();

    logger.info(`Course "${course.title}" unpublished by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Course unpublished successfully',
      data: {
        course: course.getPublicInfo()
      }
    });
  } catch (error) {
    logger.error('Unpublish course error:', error);
    next(error);
  }
};

/**
 * Upload course files - Disabled for URL-based system
 */
const uploadCourseFiles = async (req, res, next) => {
  res.status(400).json({
    success: false,
    message: 'File uploads are not supported. Please use URL-based content system.'
  });
};

/**
 * Delete course file
 */
const deleteCourseFile = async (req, res, next) => {
  res.status(400).json({
    success: false,
    message: 'File deletion is not supported. This system uses URL-based content.'
  });
};

/**
 * Get course content (for enrolled students)
 */
const getCourseContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: CourseChapter,
          as: 'chapters',
          attributes: ['id', 'title', 'description', 'video_url', 'pdf_url', 'chapter_order', 'duration_minutes', 'is_published'],
          order: [['chapter_order', 'ASC']]
        }
      ]
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    res.json({
      success: true,
      message: 'Course content retrieved successfully',
      data: {
        course: course.getPublicInfo(),
        enrollment: {
          status: req.enrollment.status,
          progress: req.enrollment.progress,
          enrolled_at: req.enrollment.enrolled_at,
          last_accessed_at: req.enrollment.last_accessed_at
        }
      }
    });
  } catch (error) {
    logger.error('Get course content error:', error);
    next(error);
  }
};

/**
 * Enroll in course
 */
const enrollInCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (!course.is_published) {
      throw new AppError('Course is not published', 400);
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: {
        student_id: req.user.id,
        course_id: id
      }
    });

    if (existingEnrollment) {
      throw new AppError('Already enrolled in this course', 400);
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student_id: req.user.id,
      course_id: id,
      status: 'enrolled'
    });

    // Update course enrollment count
    await course.updateEnrollmentCount();

    logger.info(`User ${req.user.email} enrolled in course "${course.title}"`);

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: {
        enrollment: {
          id: enrollment.id,
          status: enrollment.status,
          enrolled_at: enrollment.enrolled_at
        }
      }
    });
  } catch (error) {
    logger.error('Enroll in course error:', error);
    next(error);
  }
};

/**
 * Unenroll from course
 */
const unenrollFromCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findOne({
      where: {
        student_id: req.user.id,
        course_id: id
      }
    });

    if (!enrollment) {
      throw new AppError('Not enrolled in this course', 400);
    }

    await enrollment.destroy();

    // Update course enrollment count
    const course = await Course.findByPk(id);
    if (course) {
      await course.updateEnrollmentCount();
    }

    logger.info(`User ${req.user.email} unenrolled from course`);

    res.json({
      success: true,
      message: 'Successfully unenrolled from course'
    });
  } catch (error) {
    logger.error('Unenroll from course error:', error);
    next(error);
  }
};

/**
 * Update course progress
 */
const updateProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      throw new AppError('Progress must be between 0 and 100', 400);
    }

    await req.enrollment.updateProgress(progress);

    logger.info(`User ${req.user.email} updated progress to ${progress}% for course`);

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        progress: req.enrollment.progress,
        status: req.enrollment.status
      }
    });
  } catch (error) {
    logger.error('Update progress error:', error);
    next(error);
  }
};

/**
 * Rate course
 */
const rateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;

    if (rating < 1 || rating > 5) {
      throw new AppError('Rating must be between 1 and 5', 400);
    }

    await req.enrollment.rate(rating, review);

    // Update course average rating
    const course = await Course.findByPk(id);
    if (course) {
      await course.updateRating();
    }

    logger.info(`User ${req.user.email} rated course ${rating} stars`);

    res.json({
      success: true,
      message: 'Course rated successfully',
      data: {
        rating: req.enrollment.rating,
        review: req.enrollment.review
      }
    });
  } catch (error) {
    logger.error('Rate course error:', error);
    next(error);
  }
};

module.exports = {
  getCourses,
  searchCourses,
  getPopularCourses,
  getTopRatedCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
  uploadCourseFiles,
  deleteCourseFile,
  getCourseContent,
  enrollInCourse,
  unenrollFromCourse,
  updateProgress,
  rateCourse
};
