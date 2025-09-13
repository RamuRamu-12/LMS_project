const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// In-memory storage for project video URLs (in a real app, this would be in a database)
let projectVideoUrls = {
  1: null,
  2: null,
  3: null
};

// Simple project routes without complex model dependencies
router.get('/', async (req, res) => {
  try {
    // For now, return mock data
    const projects = [
      {
        id: 1,
        title: 'E-Commerce Web Application',
        description: 'Build a complete e-commerce platform with modern technologies including React, Node.js, and PostgreSQL.',
        shortDescription: 'Full-stack e-commerce platform with React, Node.js, and PostgreSQL',
        videoUrl: projectVideoUrls[1],
        difficulty: 'intermediate',
        estimatedDuration: 40,
        isActive: true,
        order: 1,
        phases: [
          {
            id: 1,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define project scope, requirements, and technical specifications',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 8,
            order: 1
          },
          {
            id: 2,
            title: 'Phase 2 - UI/UX (User Interface/User Experience)',
            description: 'Design user interface and user experience for the e-commerce platform',
            phaseNumber: 2,
            phaseType: 'UI/UX',
            estimatedDuration: 8,
            order: 2
          },
          {
            id: 3,
            title: 'Phase 3 - Development',
            description: 'Implement the e-commerce application using React, Node.js, and PostgreSQL',
            phaseNumber: 3,
            phaseType: 'Development',
            estimatedDuration: 16,
            order: 3
          },
          {
            id: 4,
            title: 'Phase 4 - Testing & Quality Assurance',
            description: 'Test the application thoroughly and ensure quality standards',
            phaseNumber: 4,
            phaseType: 'Testing',
            estimatedDuration: 4,
            order: 4
          },
          {
            id: 5,
            title: 'Phase 5 - Deployment & Launch',
            description: 'Deploy the application to production and launch',
            phaseNumber: 5,
            phaseType: 'Deployment',
            estimatedDuration: 4,
            order: 5
          }
        ]
      },
      {
        id: 2,
        title: 'Data Analytics Dashboard',
        description: 'Create an interactive data analytics dashboard using modern visualization libraries and real-time data processing.',
        shortDescription: 'Interactive data analytics dashboard with real-time visualization',
        videoUrl: projectVideoUrls[2],
        difficulty: 'intermediate',
        estimatedDuration: 35,
        isActive: true,
        order: 2,
        phases: [
          {
            id: 6,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define data requirements and analytics objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 7,
            order: 1
          },
          {
            id: 7,
            title: 'Phase 2 - UI/UX (User Interface/User Experience)',
            description: 'Design dashboard interface and user experience',
            phaseNumber: 2,
            phaseType: 'UI/UX',
            estimatedDuration: 7,
            order: 2
          },
          {
            id: 8,
            title: 'Phase 3 - Development',
            description: 'Build the analytics dashboard with data processing and visualization',
            phaseNumber: 3,
            phaseType: 'Development',
            estimatedDuration: 14,
            order: 3
          },
          {
            id: 9,
            title: 'Phase 4 - Testing & Quality Assurance',
            description: 'Test dashboard functionality and data accuracy',
            phaseNumber: 4,
            phaseType: 'Testing',
            estimatedDuration: 3,
            order: 4
          },
          {
            id: 10,
            title: 'Phase 5 - Deployment & Launch',
            description: 'Deploy dashboard and set up monitoring',
            phaseNumber: 5,
            phaseType: 'Deployment',
            estimatedDuration: 4,
            order: 5
          }
        ]
      },
      {
        id: 3,
        title: 'AI-Powered Learning Assistant',
        description: 'Develop an intelligent learning assistant using AI and machine learning technologies.',
        shortDescription: 'Intelligent learning assistant with AI and machine learning',
        videoUrl: projectVideoUrls[3],
        difficulty: 'advanced',
        estimatedDuration: 45,
        isActive: true,
        order: 3,
        phases: [
          {
            id: 11,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define AI requirements and learning objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 9,
            order: 1
          },
          {
            id: 12,
            title: 'Phase 2 - UI/UX (User Interface/User Experience)',
            description: 'Design AI-powered learning interface',
            phaseNumber: 2,
            phaseType: 'UI/UX',
            estimatedDuration: 9,
            order: 2
          },
          {
            id: 13,
            title: 'Phase 3 - Development',
            description: 'Implement AI learning assistant with machine learning',
            phaseNumber: 3,
            phaseType: 'Development',
            estimatedDuration: 18,
            order: 3
          },
          {
            id: 14,
            title: 'Phase 4 - Testing & Quality Assurance',
            description: 'Test AI functionality and learning effectiveness',
            phaseNumber: 4,
            phaseType: 'Testing',
            estimatedDuration: 5,
            order: 4
          },
          {
            id: 15,
            title: 'Phase 5 - Deployment & Launch',
            description: 'Deploy AI assistant and monitor performance',
            phaseNumber: 5,
            phaseType: 'Deployment',
            estimatedDuration: 4,
            order: 5
          }
        ]
      }
    ];

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id);
    
    // Mock project data
    const projects = [
      {
        id: 1,
        title: 'E-Commerce Web Application',
        description: 'Build a complete e-commerce platform with modern technologies including React, Node.js, and PostgreSQL. Learn full-stack development through hands-on project experience.',
        shortDescription: 'Full-stack e-commerce platform with React, Node.js, and PostgreSQL',
        videoUrl: projectVideoUrls[1],
        readmeContent: `# E-Commerce Web Application

## Project Overview
This project will guide you through building a complete e-commerce web application from scratch. You'll learn modern web development technologies and best practices.

## Learning Objectives
- Master React.js for frontend development
- Learn Node.js and Express.js for backend development
- Understand PostgreSQL database design and queries
- Implement user authentication and authorization
- Build responsive and accessible user interfaces
- Deploy applications to production

## Prerequisites
- Basic knowledge of JavaScript
- Familiarity with HTML and CSS
- Understanding of web development concepts

## Project Structure
The project is divided into 5 phases, each building upon the previous one.`,
        difficulty: 'intermediate',
        estimatedDuration: 40,
        isActive: true,
        order: 1
      },
      {
        id: 2,
        title: 'Data Analytics Dashboard',
        description: 'Create an interactive data analytics dashboard using modern visualization libraries and real-time data processing. Learn data science and visualization techniques.',
        shortDescription: 'Interactive data analytics dashboard with real-time visualization',
        videoUrl: projectVideoUrls[2],
        readmeContent: `# Data Analytics Dashboard

## Project Overview
Build a comprehensive data analytics dashboard that processes and visualizes data in real-time. Learn data science, visualization, and dashboard development.

## Learning Objectives
- Master data visualization techniques
- Learn real-time data processing
- Understand dashboard design principles
- Implement interactive charts and graphs
- Work with APIs and data sources
- Deploy analytics applications`,
        difficulty: 'intermediate',
        estimatedDuration: 35,
        isActive: true,
        order: 2
      },
      {
        id: 3,
        title: 'AI-Powered Learning Assistant',
        description: 'Develop an intelligent learning assistant using AI and machine learning technologies. Learn about natural language processing and AI integration.',
        shortDescription: 'Intelligent learning assistant with AI and machine learning',
        videoUrl: projectVideoUrls[3],
        readmeContent: `# AI-Powered Learning Assistant

## Project Overview
Build an intelligent learning assistant that helps students learn more effectively using AI and machine learning technologies.

## Learning Objectives
- Understand AI and machine learning concepts
- Learn natural language processing
- Implement AI model integration
- Build intelligent user interfaces
- Deploy AI applications
- Understand ethical AI practices`,
        difficulty: 'advanced',
        estimatedDuration: 45,
        isActive: true,
        order: 3
      }
    ];

    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: {
        project,
        userProgress: null
      }
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message
    });
  }
});

// Update project video URL (Admin only)
router.put('/:id/video', [
  body('videoUrl').isURL().withMessage('Valid video URL is required')
], async (req, res) => {
  try {
    const { id } = req.params;
    const { videoUrl } = req.body;
    const projectId = parseInt(id);

    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid video URL is required'
      });
    }

    // Check if project exists
    if (![1, 2, 3].includes(projectId)) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Update the video URL in memory
    projectVideoUrls[projectId] = videoUrl;

    res.json({
      success: true,
      data: {
        id: projectId,
        videoUrl: videoUrl
      },
      message: 'Project video URL updated successfully'
    });
  } catch (error) {
    console.error('Error updating project video URL:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project video URL',
      error: error.message
    });
  }
});

module.exports = router;
