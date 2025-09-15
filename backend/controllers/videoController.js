const { Video, Project, User } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

// Get all videos for a project
const getProjectVideos = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { videoType, phase, isPublic } = req.query;
    
    const whereClause = { projectId };
    
    if (videoType) whereClause.videoType = videoType;
    if (phase) whereClause.phase = phase;
    if (isPublic !== undefined) whereClause.isPublic = isPublic === 'true';

    const videos = await Video.findAll({
      where: whereClause,
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title']
        },
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['videoType', 'ASC'], ['phaseNumber', 'ASC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    logger.error('Error fetching project videos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project videos',
      error: error.message
    });
  }
};

// Get video by ID
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const video = await Video.findByPk(id, {
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title', 'description']
        },
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    logger.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching video',
      error: error.message
    });
  }
};

// Create video (Admin only)
const createVideo = async (req, res) => {
  try {
    const { projectId } = req.params;
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      videoType,
      phase,
      phaseNumber,
      duration,
      tags,
      isPublic = true
    } = req.body;

    // Check if project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // For overview videos, check if one already exists
    if (videoType === 'overview') {
      const existingOverview = await Video.findOne({
        where: { projectId, videoType: 'overview' }
      });
      
      if (existingOverview) {
        return res.status(400).json({
          success: false,
          message: 'Overview video already exists for this project. Please update the existing one.'
        });
      }
    }

    const video = await Video.create({
      projectId,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      videoType,
      phase,
      phaseNumber,
      duration,
      tags: tags ? JSON.parse(tags) : null,
      isPublic,
      uploadedBy: req.user.id,
      updatedBy: req.user.id
    });

    // If this is an overview video, update the project's overviewVideoUrl
    if (videoType === 'overview') {
      await Project.update(
        { overviewVideoUrl: videoUrl, updatedBy: req.user.id },
        { where: { id: projectId } }
      );
    }

    // Fetch the created video with associations
    const createdVideo = await Video.findByPk(video.id, {
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title']
        },
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: createdVideo
    });
  } catch (error) {
    logger.error('Error creating video:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating video',
      error: error.message
    });
  }
};

// Update video (Admin only)
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Add updatedBy to the update data
    updateData.updatedBy = req.user.id;

    // Parse tags if provided
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = JSON.parse(updateData.tags);
    }

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    const [updatedRowsCount] = await Video.update(updateData, {
      where: { id }
    });

    // If this is an overview video and videoUrl was updated, update the project's overviewVideoUrl
    if (video.videoType === 'overview' && updateData.videoUrl) {
      await Project.update(
        { overviewVideoUrl: updateData.videoUrl, updatedBy: req.user.id },
        { where: { id: video.projectId } }
      );
    }

    // Fetch the updated video
    const updatedVideo = await Video.findByPk(id, {
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title']
        },
        {
          model: User,
          as: 'uploader',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Video updated successfully',
      data: updatedVideo
    });
  } catch (error) {
    logger.error('Error updating video:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating video',
      error: error.message
    });
  }
};

// Delete video (Admin only)
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const video = await Video.findByPk(id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // If this is an overview video, clear the project's overviewVideoUrl
    if (video.videoType === 'overview') {
      await Project.update(
        { overviewVideoUrl: null, updatedBy: req.user.id },
        { where: { id: video.projectId } }
      );
    }

    // Delete from database
    await Video.destroy({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting video:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
};

// Increment view count
const incrementViewCount = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Video.increment('viewCount', {
      where: { id }
    });

    res.json({
      success: true,
      message: 'View count updated'
    });
  } catch (error) {
    logger.error('Error incrementing view count:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating view count',
      error: error.message
    });
  }
};

// Get video statistics (Admin only)
const getVideoStats = async (req, res) => {
  try {
    const totalVideos = await Video.count();
    const publicVideos = await Video.count({ where: { isPublic: true } });
    const totalViews = await Video.sum('viewCount') || 0;
    
    const videosByType = await Video.findAll({
      attributes: [
        'videoType',
        [Video.sequelize.fn('COUNT', Video.sequelize.col('id')), 'count']
      ],
      group: ['videoType'],
      raw: true
    });

    const videosByPhase = await Video.findAll({
      attributes: [
        'phase',
        [Video.sequelize.fn('COUNT', Video.sequelize.col('id')), 'count']
      ],
      where: { videoType: 'phase' },
      group: ['phase'],
      raw: true
    });

    const recentVideos = await Video.findAll({
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'title']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: {
        totalVideos,
        publicVideos,
        totalViews,
        videosByType,
        videosByPhase,
        recentVideos
      }
    });
  } catch (error) {
    logger.error('Error fetching video statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching video statistics',
      error: error.message
    });
  }
};

module.exports = {
  getProjectVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  incrementViewCount,
  getVideoStats
};
