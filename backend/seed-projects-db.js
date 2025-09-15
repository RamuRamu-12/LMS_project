const { Project, User } = require('./models');
const logger = require('./utils/logger');

const seedProjects = async () => {
  try {
    // Check if projects already exist
    const existingProjects = await Project.count();
    if (existingProjects > 0) {
      logger.info('Projects already exist in database. Skipping seed.');
      return;
    }

    // Find an admin user to be the creator
    let adminUser = await User.findOne({ where: { role: 'admin' } });
    
    if (!adminUser) {
      // Create a default admin user if none exists
      adminUser = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'admin',
        isActive: true
      });
      logger.info('Created default admin user');
    }

    const projects = [
      {
        title: 'E-Commerce Web Application',
        description: 'Build a complete e-commerce platform with modern technologies including React, Node.js, and PostgreSQL. Learn full-stack development through hands-on project experience.',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        category: 'Web Development',
        technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'JWT'],
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
            title: 'Phase 2 - UI/UX Design',
            description: 'Design user interface and user experience for the e-commerce platform',
            phaseNumber: 2,
            phaseType: 'UIUX',
            estimatedDuration: 10,
            order: 2
          },
          {
            id: 3,
            title: 'Phase 3 - Architectural Design',
            description: 'Design system architecture and technical specifications',
            phaseNumber: 3,
            phaseType: 'ARCHITECTURAL',
            estimatedDuration: 12,
            order: 3
          },
          {
            id: 4,
            title: 'Phase 4 - Code Development',
            description: 'Implement the e-commerce application using React, Node.js, and PostgreSQL',
            phaseNumber: 4,
            phaseType: 'CODE_DEVELOPMENT',
            estimatedDuration: 15,
            order: 4
          },
          {
            id: 5,
            title: 'Phase 5 - Testing & Quality Assurance',
            description: 'Test the application thoroughly and ensure quality standards',
            phaseNumber: 5,
            phaseType: 'TESTING',
            estimatedDuration: 8,
            order: 5
          },
          {
            id: 6,
            title: 'Phase 6 - Deployment',
            description: 'Deploy the application to production and maintain operations',
            phaseNumber: 6,
            phaseType: 'DEPLOYMENT',
            estimatedDuration: 6,
            order: 6
          }
        ],
        status: 'active',
        isPublished: true,
        publishedAt: new Date(),
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      },
      {
        title: 'Data Analytics Dashboard',
        description: 'Create an interactive data analytics dashboard using modern visualization libraries and real-time data processing. Learn data science and visualization techniques.',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        category: 'Data Science',
        technologies: ['Python', 'Django', 'React.js', 'D3.js', 'PostgreSQL', 'Redis', 'Docker'],
        phases: [
          {
            id: 7,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define data requirements and analytics objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 7,
            order: 1
          },
          {
            id: 8,
            title: 'Phase 2 - UI/UX Design',
            description: 'Design dashboard interface and user experience',
            phaseNumber: 2,
            phaseType: 'UIUX',
            estimatedDuration: 9,
            order: 2
          },
          {
            id: 9,
            title: 'Phase 3 - Architectural Design',
            description: 'Design data processing and visualization architecture',
            phaseNumber: 3,
            phaseType: 'ARCHITECTURAL',
            estimatedDuration: 11,
            order: 3
          },
          {
            id: 10,
            title: 'Phase 4 - Code Development',
            description: 'Build the analytics dashboard with data processing and visualization',
            phaseNumber: 4,
            phaseType: 'CODE_DEVELOPMENT',
            estimatedDuration: 13,
            order: 4
          },
          {
            id: 11,
            title: 'Phase 5 - Testing & Quality Assurance',
            description: 'Test dashboard functionality and data accuracy',
            phaseNumber: 5,
            phaseType: 'TESTING',
            estimatedDuration: 7,
            order: 5
          },
          {
            id: 12,
            title: 'Phase 6 - Deployment',
            description: 'Deploy dashboard and set up monitoring',
            phaseNumber: 6,
            phaseType: 'DEPLOYMENT',
            estimatedDuration: 5,
            order: 6
          }
        ],
        status: 'active',
        isPublished: true,
        publishedAt: new Date(),
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      },
      {
        title: 'AI-Powered Learning Assistant',
        description: 'Develop an intelligent learning assistant using AI and machine learning technologies. Learn about natural language processing and AI integration.',
        difficulty: 'advanced',
        estimatedDuration: 45,
        category: 'Artificial Intelligence',
        technologies: ['Python', 'TensorFlow', 'React.js', 'Node.js', 'MongoDB', 'OpenAI API', 'Docker'],
        phases: [
          {
            id: 13,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define AI requirements and learning objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 9,
            order: 1
          },
          {
            id: 14,
            title: 'Phase 2 - UI/UX Design',
            description: 'Design AI-powered learning interface',
            phaseNumber: 2,
            phaseType: 'UIUX',
            estimatedDuration: 11,
            order: 2
          },
          {
            id: 15,
            title: 'Phase 3 - Architectural Design',
            description: 'Design AI/ML system architecture',
            phaseNumber: 3,
            phaseType: 'ARCHITECTURAL',
            estimatedDuration: 13,
            order: 3
          },
          {
            id: 16,
            title: 'Phase 4 - Code Development',
            description: 'Implement AI learning assistant with machine learning',
            phaseNumber: 4,
            phaseType: 'CODE_DEVELOPMENT',
            estimatedDuration: 16,
            order: 4
          },
          {
            id: 17,
            title: 'Phase 5 - Testing & Quality Assurance',
            description: 'Test AI functionality and learning effectiveness',
            phaseNumber: 5,
            phaseType: 'TESTING',
            estimatedDuration: 9,
            order: 5
          },
          {
            id: 18,
            title: 'Phase 6 - Deployment',
            description: 'Deploy AI assistant and monitor performance',
            phaseNumber: 6,
            phaseType: 'DEPLOYMENT',
            estimatedDuration: 7,
            order: 6
          }
        ],
        status: 'active',
        isPublished: true,
        publishedAt: new Date(),
        createdBy: adminUser.id,
        updatedBy: adminUser.id
      }
    ];

    // Create projects
    for (const projectData of projects) {
      await Project.create(projectData);
      logger.info(`Created project: ${projectData.title}`);
    }

    logger.info('Projects seeded successfully');
  } catch (error) {
    logger.error('Error seeding projects:', error);
    throw error;
  }
};

module.exports = seedProjects;
