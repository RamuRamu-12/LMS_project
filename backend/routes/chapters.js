const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const { CourseChapter } = require('../models');
const {
  createChapter,
  getChapters,
  getChapter,
  updateChapter,
  deleteChapter,
  reorderChapters
} = require('../controllers/chapterController');

// All routes require authentication
router.use(authenticate);

// Create chapter (admin only)
router.post('/:courseId', requireAdmin, uploadSingle('file'), createChapter);

// Get all chapters for a course
router.get('/:courseId', getChapters);

// Get specific chapter
router.get('/:courseId/:chapterId', getChapter);

// Update chapter (admin only)
router.put('/:courseId/:chapterId', requireAdmin, uploadSingle('file'), updateChapter);

// Delete chapter (admin only)
router.delete('/:courseId/:chapterId', requireAdmin, deleteChapter);

// Reorder chapters (admin only)
router.put('/:courseId/reorder', requireAdmin, reorderChapters);

// Toggle chapter publish status (admin only)
router.patch('/:courseId/:chapterId/toggle-publish', requireAdmin, async (req, res, next) => {
  try {
    const { courseId, chapterId } = req.params;
    const chapter = await CourseChapter.findOne({
      where: { id: chapterId, course_id: courseId }
    });

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }

    chapter.is_published = !chapter.is_published;
    await chapter.save();

    res.json({
      success: true,
      message: `Chapter ${chapter.is_published ? 'published' : 'unpublished'} successfully`,
      data: { chapter: chapter.getPublicInfo() }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;