const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middleware/auth');
const {
  getAllProjects,
  getProjectById,
  updateProjectVideos,
  updateProjectDocuments,
  getProjectVideos,
  getProjectDocuments
} = require('../controllers/realtimeProjectsController');

// Admin routes (require authentication and admin role)
router.use(authenticate); // All routes require authentication

// Get all projects (admin only)
router.get('/', requireAdmin, getAllProjects);

// Get single project (admin only)
router.get('/:id', requireAdmin, getProjectById);

// Update project videos (admin only)
router.put('/:id/videos', requireAdmin, updateProjectVideos);

// Update project documents (admin only)
router.put('/:id/documents', requireAdmin, updateProjectDocuments);

// Public routes (for frontend to fetch videos and documents)
router.get('/:id/videos', getProjectVideos);
router.get('/:id/documents', getProjectDocuments);

module.exports = router;
