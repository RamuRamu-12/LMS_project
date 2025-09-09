const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
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
router.post('/courses/:courseId/chapters', requireAdmin, uploadSingle('file'), createChapter);

// Get all chapters for a course
router.get('/courses/:courseId/chapters', getChapters);

// Get specific chapter
router.get('/courses/:courseId/chapters/:chapterId', getChapter);

// Update chapter (admin only)
router.put('/courses/:courseId/chapters/:chapterId', requireAdmin, uploadSingle('file'), updateChapter);

// Delete chapter (admin only)
router.delete('/courses/:courseId/chapters/:chapterId', requireAdmin, deleteChapter);

// Reorder chapters (admin only)
router.put('/courses/:courseId/chapters/reorder', requireAdmin, reorderChapters);

module.exports = router;