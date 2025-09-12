const { ProjectProgress, Project, ProjectPhase, User } = require('../models');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Update or create progress for a project/phase
const updateProgress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const { projectId, phaseId, status, progressPercentage, timeSpent, notes } = req.body;

    // Find or create progress record
    const [progress, created] = await ProjectProgress.findOrCreate({
      where: {
        userId,
        projectId,
        phaseId: phaseId || null
      },
      defaults: {
        userId,
        projectId,
        phaseId: phaseId || null,
        status: status || 'in_progress',
        progressPercentage: progressPercentage || 0,
        timeSpent: timeSpent || 0,
        notes: notes || null,
        lastAccessedAt: new Date()
      }
    });

    if (!created) {
      // Update existing progress
      const updateData = {
        lastAccessedAt: new Date()
      };

      if (status) updateData.status = status;
      if (progressPercentage !== undefined) updateData.progressPercentage = progressPercentage;
      if (timeSpent !== undefined) updateData.timeSpent = progress.timeSpent + (timeSpent || 0);
      if (notes !== undefined) updateData.notes = notes;

      if (status === 'completed') {
        updateData.completedAt = new Date();
      }

      await progress.update(updateData);
    }

    res.json({
      success: true,
      data: progress,
      message: created ? 'Progress created successfully' : 'Progress updated successfully'
    });
  } catch (error) {
    logger.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress',
      error: error.message
    });
  }
};

// Get user progress for a project
const getProjectProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;

    const progress = await ProjectProgress.findAll({
      where: {
        userId,
        projectId
      },
      include: [
        {
          model: ProjectPhase,
          as: 'phase',
          attributes: ['id', 'title', 'phaseNumber', 'phaseType']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title', 'description']
        }
      ],
      order: [['created_at', 'ASC']]
    });

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    logger.error('Error fetching project progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project progress',
      error: error.message
    });
  }
};

// Get user progress for all projects
const getAllUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await ProjectProgress.findAll({
      where: { userId },
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title', 'description', 'difficulty']
        },
        {
          model: ProjectPhase,
          as: 'phase',
          attributes: ['id', 'title', 'phaseNumber', 'phaseType']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    // Group progress by project
    const groupedProgress = progress.reduce((acc, item) => {
      const projectId = item.projectId;
      if (!acc[projectId]) {
        acc[projectId] = {
          project: item.project,
          phases: []
        };
      }
      if (item.phase) {
        acc[projectId].phases.push(item);
      }
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedProgress
    });
  } catch (error) {
    logger.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user progress',
      error: error.message
    });
  }
};

// Get project leaderboard
const getProjectLeaderboard = async (req, res) => {
  try {
    const { projectId } = req.params;

    const leaderboard = await ProjectProgress.findAll({
      where: {
        projectId,
        status: 'completed'
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar']
        }
      ],
      order: [['completedAt', 'ASC']],
      limit: 50
    });

    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    logger.error('Error fetching project leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project leaderboard',
      error: error.message
    });
  }
};

module.exports = {
  updateProgress,
  getProjectProgress,
  getAllUserProgress,
  getProjectLeaderboard
};
