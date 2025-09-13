const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const projectController = require('../controllers/projectController');
const phaseController = require('../controllers/phaseController');
const progressController = require('../controllers/progressController');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Validation rules
const projectValidation = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  body('description').optional().isString(),
  body('shortDescription').optional().isLength({ max: 500 }),
  body('videoUrl').optional().isURL().withMessage('Invalid video URL'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  body('estimatedDuration').optional().isInt({ min: 0 }),
  body('order').optional().isInt({ min: 0 })
];

const phaseValidation = [
  body('projectId').isInt().withMessage('Project ID is required'),
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  body('description').optional().isString(),
  body('phaseNumber').isInt({ min: 1, max: 5 }).withMessage('Phase number must be between 1 and 5'),
  body('phaseType').isIn(['BRD', 'UI/UX', 'Development', 'Testing', 'Deployment']).withMessage('Invalid phase type'),
  body('estimatedDuration').optional().isInt({ min: 0 })
];

const progressValidation = [
  body('projectId').isInt().withMessage('Project ID is required'),
  body('phaseId').optional().isInt(),
  body('status').optional().isIn(['not_started', 'in_progress', 'completed', 'skipped']),
  body('progressPercentage').optional().isInt({ min: 0, max: 100 }),
  body('timeSpent').optional().isInt({ min: 0 }),
  body('notes').optional().isString()
];

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.get('/:projectId/phases', phaseController.getProjectPhases);
router.get('/:projectId/leaderboard', progressController.getProjectLeaderboard);

// Protected routes
router.use(authenticate);

// Progress routes
router.post('/progress', progressValidation, progressController.updateProgress);
router.get('/progress/user', progressController.getAllUserProgress);
router.get('/:projectId/progress', progressController.getProjectProgress);

// Admin routes
router.use(requireAdmin);

router.post('/', projectValidation, projectController.createProject);
router.put('/:id', projectValidation, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.get('/:id/analytics', projectController.getProjectAnalytics);

// Video management routes
router.put('/:id/video', [
  body('videoUrl').isURL().withMessage('Valid video URL is required')
], projectController.updateProjectVideoUrl);

// Phase routes (Admin only)
router.post('/phases', phaseValidation, phaseController.createPhase);
router.get('/phases/:id', phaseController.getPhaseById);
router.put('/phases/:id', phaseValidation, phaseController.updatePhase);
router.delete('/phases/:id', phaseController.deletePhase);

module.exports = router;
