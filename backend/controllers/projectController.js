const { Project, ProjectPhase, ProjectProgress, User } = require('../models');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { isActive: true },
      include: [
        {
          model: ProjectPhase,
          as: 'phases',
          where: { isActive: true },
          required: false,
          order: [['phaseNumber', 'ASC']]
        }
      ],
      order: [['order', 'ASC']]
    });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    logger.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
};

// Get single project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const project = await Project.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: ProjectPhase,
          as: 'phases',
          where: { isActive: true },
          required: false,
          order: [['phaseNumber', 'ASC']]
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Get user progress if user is authenticated
    let userProgress = null;
    if (userId) {
      userProgress = await ProjectProgress.findAll({
        where: { userId, projectId: id },
        include: [
          {
            model: ProjectPhase,
            as: 'phase'
          }
        ]
      });
    }

    res.json({
      success: true,
      data: {
        project,
        userProgress
      }
    });
  } catch (error) {
    logger.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message
    });
  }
};

// Create new project (Admin only)
const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const projectData = req.body;
    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    logger.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

// Update project (Admin only)
const updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.update(updateData);

    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    logger.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

// Delete project (Admin only)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.update({ isActive: false });

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
};

// Get project analytics (Admin only)
const getProjectAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: ProjectProgress,
          as: 'progress',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const analytics = {
      totalUsers: project.progress.length,
      completedUsers: project.progress.filter(p => p.status === 'completed').length,
      inProgressUsers: project.progress.filter(p => p.status === 'in_progress').length,
      averageProgress: project.progress.reduce((acc, p) => acc + p.progressPercentage, 0) / project.progress.length || 0,
      totalTimeSpent: project.progress.reduce((acc, p) => acc + p.timeSpent, 0)
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    logger.error('Error fetching project analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project analytics',
      error: error.message
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectAnalytics
};
