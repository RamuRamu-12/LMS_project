const { Project, User } = require('../models');
const { AppError } = require('../middleware/errorHandler');

// Get all projects for admin
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['order', 'ASC'], ['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    next(new AppError('Failed to fetch projects', 500));
  }
};

// Get single project by ID
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(new AppError('Failed to fetch project', 500));
  }
};

// Update project videos
const updateProjectVideos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      overview_video_url,
      brd_video_url,
      uiux_video_url,
      architectural_video_url,
      code_development_video_url,
      testing_video_url,
      deployment_video_url
    } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return next(new AppError('Access denied. Admin privileges required.', 403));
    }

    // Update video URLs
    const updateData = {
      overview_video_url,
      brd_video_url,
      uiux_video_url,
      architectural_video_url,
      code_development_video_url,
      testing_video_url,
      deployment_video_url,
      videos_last_updated: new Date(),
      videos_uploaded_by: req.user.id
    };

    // Add metadata for video uploads
    const videoMetadata = {};
    if (overview_video_url) videoMetadata.overview = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (brd_video_url) videoMetadata.brd = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (uiux_video_url) videoMetadata.uiux = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (architectural_video_url) videoMetadata.architectural = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (code_development_video_url) videoMetadata.codeDevelopment = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (testing_video_url) videoMetadata.testing = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (deployment_video_url) videoMetadata.deployment = { uploadedAt: new Date(), uploadedBy: req.user.id };

    updateData.video_uploads = { ...project.video_uploads, ...videoMetadata };

    await project.update(updateData);

    res.json({
      success: true,
      message: 'Project videos updated successfully',
      data: project
    });
  } catch (error) {
    next(new AppError('Failed to update project videos', 500));
  }
};

// Update project documents
const updateProjectDocuments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      brd_document_url,
      uiux_document_url,
      architectural_document_url,
      code_development_document_url,
      testing_document_url,
      deployment_document_url
    } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return next(new AppError('Access denied. Admin privileges required.', 403));
    }

    // Update document URLs
    const updateData = {
      brd_document_url,
      uiux_document_url,
      architectural_document_url,
      code_development_document_url,
      testing_document_url,
      deployment_document_url,
      documents_last_updated: new Date(),
      documents_uploaded_by: req.user.id
    };

    // Add metadata for document uploads
    const documentMetadata = {};
    if (brd_document_url) documentMetadata.brd = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (uiux_document_url) documentMetadata.uiux = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (architectural_document_url) documentMetadata.architectural = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (code_development_document_url) documentMetadata.codeDevelopment = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (testing_document_url) documentMetadata.testing = { uploadedAt: new Date(), uploadedBy: req.user.id };
    if (deployment_document_url) documentMetadata.deployment = { uploadedAt: new Date(), uploadedBy: req.user.id };

    updateData.document_uploads = { ...project.document_uploads, ...documentMetadata };

    await project.update(updateData);

    res.json({
      success: true,
      message: 'Project documents updated successfully',
      data: project
    });
  } catch (error) {
    next(new AppError('Failed to update project documents', 500));
  }
};

// Get project videos (for frontend)
const getProjectVideos = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      attributes: [
        'id',
        'title',
        'overview_video_url',
        'brd_video_url',
        'uiux_video_url',
        'architectural_video_url',
        'code_development_video_url',
        'testing_video_url',
        'deployment_video_url',
        'videos_last_updated',
        'videos_uploaded_by'
      ]
    });

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    res.json({
      success: true,
      data: {
        projectId: project.id,
        projectTitle: project.title,
        videos: {
          overview: project.overview_video_url,
          brd: project.brd_video_url,
          uiux: project.uiux_video_url,
          architectural: project.architectural_video_url,
          codeDevelopment: project.code_development_video_url,
          testing: project.testing_video_url,
          deployment: project.deployment_video_url
        },
        lastUpdated: project.videos_last_updated,
        uploadedBy: project.videos_uploaded_by
      }
    });
  } catch (error) {
    next(new AppError('Failed to fetch project videos', 500));
  }
};

// Get project documents (for frontend)
const getProjectDocuments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      attributes: [
        'id',
        'title',
        'brd_document_url',
        'uiux_document_url',
        'architectural_document_url',
        'code_development_document_url',
        'testing_document_url',
        'deployment_document_url',
        'documents_last_updated',
        'documents_uploaded_by'
      ]
    });

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    res.json({
      success: true,
      data: {
        projectId: project.id,
        projectTitle: project.title,
        documents: {
          brd: project.brd_document_url,
          uiux: project.uiux_document_url,
          architectural: project.architectural_document_url,
          codeDevelopment: project.code_development_document_url,
          testing: project.testing_document_url,
          deployment: project.deployment_document_url
        },
        lastUpdated: project.documents_last_updated,
        uploadedBy: project.documents_uploaded_by
      }
    });
  } catch (error) {
    next(new AppError('Failed to fetch project documents', 500));
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  updateProjectVideos,
  updateProjectDocuments,
  getProjectVideos,
  getProjectDocuments
};
