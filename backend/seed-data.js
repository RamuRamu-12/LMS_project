const { Sequelize } = require('sequelize');

// Use default database configuration
const sequelize = new Sequelize('lms_db', 'postgres', 'password', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: false
  }
});

async function seedData() {
  try {
    console.log('🔄 Seeding Realtime Projects data...');
    
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Insert Project 1: E-Commerce Web Application
    console.log('📋 Inserting Project 1...');
    const [project1Result] = await sequelize.query(`
      INSERT INTO projects (title, description, "shortDescription", "videoUrl", "readmeContent", difficulty, "estimatedDuration", "isActive", "order")
      VALUES (
        'E-Commerce Web Application',
        'Build a complete e-commerce platform with modern technologies including React, Node.js, and PostgreSQL. Learn full-stack development through hands-on project experience.',
        'Full-stack e-commerce platform with React, Node.js, and PostgreSQL',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        '# E-Commerce Web Application\n\n## Project Overview\nThis project will guide you through building a complete e-commerce web application from scratch. You''ll learn modern web development technologies and best practices.\n\n## Learning Objectives\n- Master React.js for frontend development\n- Learn Node.js and Express.js for backend development\n- Understand PostgreSQL database design and queries\n- Implement user authentication and authorization\n- Build responsive and accessible user interfaces\n- Deploy applications to production',
        'intermediate',
        40,
        true,
        1
      )
      RETURNING id
    `);
    const project1Id = project1Result[0].id;
    console.log('✅ Project 1 created with ID:', project1Id);
    
    // Insert phases for Project 1
    const project1Phases = [
      {
        projectId: project1Id,
        title: 'Phase 1 - BRD (Business Requirements Document)',
        description: 'Define project scope, requirements, and technical specifications',
        phaseNumber: 1,
        phaseType: 'BRD',
        content: 'Create comprehensive business requirements document including stakeholder analysis, functional requirements, and technical specifications.',
        instructions: '1. Identify stakeholders and their needs\n2. Define functional requirements\n3. Create technical specifications\n4. Perform risk assessment\n5. Create project timeline',
        estimatedDuration: 8,
        order: 1
      },
      {
        projectId: project1Id,
        title: 'Phase 2 - UI/UX (User Interface/User Experience)',
        description: 'Design user interface and user experience for the e-commerce platform',
        phaseNumber: 2,
        phaseType: 'UI/UX',
        content: 'Design intuitive and responsive user interfaces for the e-commerce platform including wireframes, prototypes, and design system.',
        instructions: '1. Create user personas\n2. Design wireframes\n3. Create high-fidelity prototypes\n4. Develop design system\n5. Conduct usability testing',
        estimatedDuration: 8,
        order: 2
      },
      {
        projectId: project1Id,
        title: 'Phase 3 - Development',
        description: 'Implement the e-commerce application using React, Node.js, and PostgreSQL',
        phaseNumber: 3,
        phaseType: 'Development',
        content: 'Build the complete e-commerce application with all features including user authentication, product catalog, shopping cart, and payment integration.',
        instructions: '1. Set up development environment\n2. Implement backend API\n3. Build frontend components\n4. Integrate database\n5. Implement authentication',
        estimatedDuration: 16,
        order: 3
      },
      {
        projectId: project1Id,
        title: 'Phase 4 - Testing & Quality Assurance',
        description: 'Test the application thoroughly and ensure quality standards',
        phaseNumber: 4,
        phaseType: 'Testing',
        content: 'Comprehensive testing including unit tests, integration tests, and user acceptance testing.',
        instructions: '1. Write unit tests\n2. Perform integration testing\n3. Conduct user acceptance testing\n4. Performance testing\n5. Security testing',
        estimatedDuration: 4,
        order: 4
      },
      {
        projectId: project1Id,
        title: 'Phase 5 - Deployment & Launch',
        description: 'Deploy the application to production and launch',
        phaseNumber: 5,
        phaseType: 'Deployment',
        content: 'Deploy the e-commerce application to production environment and ensure smooth launch.',
        instructions: '1. Set up production environment\n2. Configure CI/CD pipeline\n3. Deploy application\n4. Monitor performance\n5. Launch and support',
        estimatedDuration: 4,
        order: 5
      }
    ];
    
    for (const phase of project1Phases) {
      await sequelize.query(`
        INSERT INTO project_phases ("projectId", title, description, "phaseNumber", "phaseType", content, instructions, "estimatedDuration", "isActive", "order")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?)
      `, {
        replacements: [
          phase.projectId,
          phase.title,
          phase.description,
          phase.phaseNumber,
          phase.phaseType,
          phase.content,
          phase.instructions,
          phase.estimatedDuration,
          phase.order
        ]
      });
    }
    console.log('✅ Project 1 phases created');
    
    // Insert Project 2: Data Analytics Dashboard
    console.log('📋 Inserting Project 2...');
    const [project2Result] = await sequelize.query(`
      INSERT INTO projects (title, description, "shortDescription", "videoUrl", "readmeContent", difficulty, "estimatedDuration", "isActive", "order")
      VALUES (
        'Data Analytics Dashboard',
        'Create an interactive data analytics dashboard using modern visualization libraries and real-time data processing. Learn data science and visualization techniques.',
        'Interactive data analytics dashboard with real-time visualization',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        '# Data Analytics Dashboard\n\n## Project Overview\nBuild a comprehensive data analytics dashboard that processes and visualizes data in real-time. Learn data science, visualization, and dashboard development.\n\n## Learning Objectives\n- Master data visualization techniques\n- Learn real-time data processing\n- Understand dashboard design principles\n- Implement interactive charts and graphs\n- Work with APIs and data sources\n- Deploy analytics applications',
        'intermediate',
        35,
        true,
        2
      )
      RETURNING id
    `);
    const project2Id = project2Result[0].id;
    console.log('✅ Project 2 created with ID:', project2Id);
    
    // Insert phases for Project 2
    const project2Phases = [
      {
        projectId: project2Id,
        title: 'Phase 1 - BRD (Business Requirements Document)',
        description: 'Define data requirements and analytics objectives',
        phaseNumber: 1,
        phaseType: 'BRD',
        content: 'Create comprehensive requirements document for data analytics dashboard including data sources, metrics, and reporting needs.',
        instructions: '1. Identify data sources\n2. Define key metrics\n3. Create reporting requirements\n4. Plan data architecture\n5. Set performance goals',
        estimatedDuration: 7,
        order: 1
      },
      {
        projectId: project2Id,
        title: 'Phase 2 - UI/UX (User Interface/User Experience)',
        description: 'Design dashboard interface and user experience',
        phaseNumber: 2,
        phaseType: 'UI/UX',
        content: 'Design intuitive dashboard interface with focus on data visualization and user experience.',
        instructions: '1. Create dashboard wireframes\n2. Design data visualization layouts\n3. Plan user interactions\n4. Create responsive design\n5. Test usability',
        estimatedDuration: 7,
        order: 2
      },
      {
        projectId: project2Id,
        title: 'Phase 3 - Development',
        description: 'Build the analytics dashboard with data processing and visualization',
        phaseNumber: 3,
        phaseType: 'Development',
        content: 'Implement the complete analytics dashboard with data processing, visualization, and real-time updates.',
        instructions: '1. Set up data pipeline\n2. Implement visualization components\n3. Create interactive features\n4. Add real-time updates\n5. Optimize performance',
        estimatedDuration: 14,
        order: 3
      },
      {
        projectId: project2Id,
        title: 'Phase 4 - Testing & Quality Assurance',
        description: 'Test dashboard functionality and data accuracy',
        phaseNumber: 4,
        phaseType: 'Testing',
        content: 'Comprehensive testing of dashboard functionality, data accuracy, and performance.',
        instructions: '1. Test data accuracy\n2. Validate visualizations\n3. Performance testing\n4. User acceptance testing\n5. Security testing',
        estimatedDuration: 3,
        order: 4
      },
      {
        projectId: project2Id,
        title: 'Phase 5 - Deployment & Launch',
        description: 'Deploy dashboard and set up monitoring',
        phaseNumber: 5,
        phaseType: 'Deployment',
        content: 'Deploy the analytics dashboard to production and set up monitoring and maintenance.',
        instructions: '1. Deploy to production\n2. Set up monitoring\n3. Configure alerts\n4. User training\n5. Launch and support',
        estimatedDuration: 4,
        order: 5
      }
    ];
    
    for (const phase of project2Phases) {
      await sequelize.query(`
        INSERT INTO project_phases ("projectId", title, description, "phaseNumber", "phaseType", content, instructions, "estimatedDuration", "isActive", "order")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?)
      `, {
        replacements: [
          phase.projectId,
          phase.title,
          phase.description,
          phase.phaseNumber,
          phase.phaseType,
          phase.content,
          phase.instructions,
          phase.estimatedDuration,
          phase.order
        ]
      });
    }
    console.log('✅ Project 2 phases created');
    
    // Insert Project 3: AI-Powered Learning Assistant
    console.log('📋 Inserting Project 3...');
    const [project3Result] = await sequelize.query(`
      INSERT INTO projects (title, description, "shortDescription", "videoUrl", "readmeContent", difficulty, "estimatedDuration", "isActive", "order")
      VALUES (
        'AI-Powered Learning Assistant',
        'Develop an intelligent learning assistant using AI and machine learning technologies. Learn about natural language processing and AI integration.',
        'Intelligent learning assistant with AI and machine learning',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        '# AI-Powered Learning Assistant\n\n## Project Overview\nBuild an intelligent learning assistant that helps students learn more effectively using AI and machine learning technologies.\n\n## Learning Objectives\n- Understand AI and machine learning concepts\n- Learn natural language processing\n- Implement AI model integration\n- Build intelligent user interfaces\n- Deploy AI applications\n- Understand ethical AI practices',
        'advanced',
        45,
        true,
        3
      )
      RETURNING id
    `);
    const project3Id = project3Result[0].id;
    console.log('✅ Project 3 created with ID:', project3Id);
    
    // Insert phases for Project 3
    const project3Phases = [
      {
        projectId: project3Id,
        title: 'Phase 1 - BRD (Business Requirements Document)',
        description: 'Define AI requirements and learning objectives',
        phaseNumber: 1,
        phaseType: 'BRD',
        content: 'Create comprehensive requirements document for AI-powered learning assistant including AI capabilities and learning objectives.',
        instructions: '1. Define AI capabilities\n2. Identify learning objectives\n3. Plan AI architecture\n4. Set performance metrics\n5. Consider ethical implications',
        estimatedDuration: 9,
        order: 1
      },
      {
        projectId: project3Id,
        title: 'Phase 2 - UI/UX (User Interface/User Experience)',
        description: 'Design AI-powered learning interface',
        phaseNumber: 2,
        phaseType: 'UI/UX',
        content: 'Design intuitive interface for AI learning assistant with focus on conversational UI and learning experience.',
        instructions: '1. Design conversational interface\n2. Create learning flow diagrams\n3. Plan AI interaction patterns\n4. Design feedback systems\n5. Test user experience',
        estimatedDuration: 9,
        order: 2
      },
      {
        projectId: project3Id,
        title: 'Phase 3 - Development',
        description: 'Implement AI learning assistant with machine learning',
        phaseNumber: 3,
        phaseType: 'Development',
        content: 'Build the complete AI learning assistant with natural language processing and machine learning capabilities.',
        instructions: '1. Set up AI development environment\n2. Implement NLP features\n3. Build learning algorithms\n4. Create AI interface\n5. Integrate machine learning models',
        estimatedDuration: 18,
        order: 3
      },
      {
        projectId: project3Id,
        title: 'Phase 4 - Testing & Quality Assurance',
        description: 'Test AI functionality and learning effectiveness',
        phaseNumber: 4,
        phaseType: 'Testing',
        content: 'Comprehensive testing of AI functionality, learning effectiveness, and system performance.',
        instructions: '1. Test AI model accuracy\n2. Validate learning algorithms\n3. Performance testing\n4. User acceptance testing\n5. Ethical AI testing',
        estimatedDuration: 5,
        order: 4
      },
      {
        projectId: project3Id,
        title: 'Phase 5 - Deployment & Launch',
        description: 'Deploy AI assistant and monitor performance',
        phaseNumber: 5,
        phaseType: 'Deployment',
        content: 'Deploy the AI learning assistant to production and set up monitoring and continuous learning.',
        instructions: '1. Deploy AI models\n2. Set up monitoring\n3. Configure continuous learning\n4. User training\n5. Launch and support',
        estimatedDuration: 4,
        order: 5
      }
    ];
    
    for (const phase of project3Phases) {
      await sequelize.query(`
        INSERT INTO project_phases ("projectId", title, description, "phaseNumber", "phaseType", content, instructions, "estimatedDuration", "isActive", "order")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?)
      `, {
        replacements: [
          phase.projectId,
          phase.title,
          phase.description,
          phase.phaseNumber,
          phase.phaseType,
          phase.content,
          phase.instructions,
          phase.estimatedDuration,
          phase.order
        ]
      });
    }
    console.log('✅ Project 3 phases created');
    
    console.log('🎉 All data seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

seedData();
