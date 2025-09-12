const express = require('express');
const router = express.Router();

// Simple progress routes with mock data
router.post('/projects/progress', async (req, res) => {
  try {
    const { projectId, phaseId, status, progressPercentage, timeSpent, notes } = req.body;
    
    // Mock progress update
    const progress = {
      id: Math.floor(Math.random() * 1000),
      userId: 1, // Mock user ID
      projectId,
      phaseId,
      status: status || 'in_progress',
      progressPercentage: progressPercentage || 0,
      timeSpent: timeSpent || 0,
      notes: notes || null,
      lastAccessedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.json({
      success: true,
      data: progress,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress',
      error: error.message
    });
  }
});

router.get('/projects/:projectId/progress', async (req, res) => {
  try {
    const { projectId } = req.params;
    
    // Mock progress data
    const progress = [
      {
        id: 1,
        userId: 1,
        projectId: parseInt(projectId),
        phaseId: 1,
        status: 'completed',
        progressPercentage: 100,
        timeSpent: 480, // 8 hours in minutes
        lastAccessedAt: new Date(),
        completedAt: new Date(),
        phase: {
          id: 1,
          title: 'Phase 1 - BRD (Business Requirements Document)',
          phaseNumber: 1,
          phaseType: 'BRD'
        }
      },
      {
        id: 2,
        userId: 1,
        projectId: parseInt(projectId),
        phaseId: 2,
        status: 'in_progress',
        progressPercentage: 50,
        timeSpent: 240, // 4 hours in minutes
        lastAccessedAt: new Date(),
        phase: {
          id: 2,
          title: 'Phase 2 - UI/UX (User Interface/User Experience)',
          phaseNumber: 2,
          phaseType: 'UI/UX'
        }
      }
    ];

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching project progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project progress',
      error: error.message
    });
  }
});

router.get('/projects/progress/user', async (req, res) => {
  try {
    // Mock user progress data
    const progress = {
      1: {
        project: {
          id: 1,
          title: 'E-Commerce Web Application',
          description: 'Build a complete e-commerce platform with modern technologies',
          difficulty: 'intermediate'
        },
        phases: [
          {
            id: 1,
            userId: 1,
            projectId: 1,
            phaseId: 1,
            status: 'completed',
            progressPercentage: 100,
            timeSpent: 480,
            phase: {
              id: 1,
              title: 'Phase 1 - BRD (Business Requirements Document)',
              phaseNumber: 1,
              phaseType: 'BRD'
            }
          }
        ]
      }
    };

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user progress',
      error: error.message
    });
  }
});

module.exports = router;
