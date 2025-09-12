const { ProjectPhase, Project, ProjectProgress } = require('../models');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Get all phases for a project
const getProjectPhases = async (req, res) => {
  try {
    const { projectId } = req.params;

    const phases = await ProjectPhase.findAll({
      where: { 
        projectId,
        isActive: true 
      },
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title', 'description']
        }
      ],
      order: [['phaseNumber', 'ASC']]
    });

    res.json({
      success: true,
      data: phases
    });
  } catch (error) {
    logger.error('Error fetching project phases:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project phases',
      error: error.message
    });
  }
};

// Get single phase by ID
const getPhaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const phase = await ProjectPhase.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title', 'description']
        }
      ]
    });

    if (!phase) {
      return res.status(404).json({
        success: false,
        message: 'Phase not found'
      });
    }

    // Get user progress if user is authenticated
    let userProgress = null;
    if (userId) {
      userProgress = await ProjectProgress.findOne({
        where: { 
          userId, 
          projectId: phase.projectId,
          phaseId: id 
        }
      });
    }

    res.json({
      success: true,
      data: {
        phase,
        userProgress
      }
    });
  } catch (error) {
    logger.error('Error fetching phase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch phase',
      error: error.message
    });
  }
};

// Create new phase (Admin only)
const createPhase = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const phaseData = req.body;
    const phase = await ProjectPhase.create(phaseData);

    res.status(201).json({
      success: true,
      data: phase,
      message: 'Phase created successfully'
    });
  } catch (error) {
    logger.error('Error creating phase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create phase',
      error: error.message
    });
  }
};

// Update phase (Admin only)
const updatePhase = async (req, res) => {
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

    const phase = await ProjectPhase.findByPk(id);
    if (!phase) {
      return res.status(404).json({
        success: false,
        message: 'Phase not found'
      });
    }

    await phase.update(updateData);

    res.json({
      success: true,
      data: phase,
      message: 'Phase updated successfully'
    });
  } catch (error) {
    logger.error('Error updating phase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update phase',
      error: error.message
    });
  }
};

// Delete phase (Admin only)
const deletePhase = async (req, res) => {
  try {
    const { id } = req.params;

    const phase = await ProjectPhase.findByPk(id);
    if (!phase) {
      return res.status(404).json({
        success: false,
        message: 'Phase not found'
      });
    }

    await phase.update({ isActive: false });

    res.json({
      success: true,
      message: 'Phase deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting phase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete phase',
      error: error.message
    });
  }
};

module.exports = {
  getProjectPhases,
  getPhaseById,
  createPhase,
  updatePhase,
  deletePhase
};
