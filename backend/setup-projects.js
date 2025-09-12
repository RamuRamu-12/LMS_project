const { sequelize } = require('./models');

async function setupProjects() {
  try {
    console.log('🔄 Setting up Realtime Projects...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Create projects table
    console.log('📋 Creating projects table...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        "shortDescription" VARCHAR(500),
        "videoUrl" TEXT,
        "readmeContent" TEXT,
        difficulty VARCHAR(20) DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
        "estimatedDuration" INTEGER DEFAULT 0 CHECK ("estimatedDuration" >= 0),
        thumbnail TEXT,
        "isActive" BOOLEAN DEFAULT true,
        "order" INTEGER DEFAULT 0,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Projects table created');
    
    // Create project_phases table
    console.log('📋 Creating project_phases table...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS project_phases (
        id SERIAL PRIMARY KEY,
        "projectId" INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        "phaseNumber" INTEGER NOT NULL CHECK ("phaseNumber" >= 1 AND "phaseNumber" <= 5),
        "phaseType" VARCHAR(20) NOT NULL CHECK ("phaseType" IN ('BRD', 'UI/UX', 'Development', 'Testing', 'Deployment')),
        content TEXT,
        instructions TEXT,
        resources JSONB DEFAULT '[]',
        "estimatedDuration" INTEGER DEFAULT 0 CHECK ("estimatedDuration" >= 0),
        "isActive" BOOLEAN DEFAULT true,
        "order" INTEGER DEFAULT 0,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Project phases table created');
    
    // Create project_progress table
    console.log('📋 Creating project_progress table...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS project_progress (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "projectId" INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        "phaseId" INTEGER REFERENCES project_phases(id) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')),
        "progressPercentage" INTEGER DEFAULT 0 CHECK ("progressPercentage" >= 0 AND "progressPercentage" <= 100),
        "timeSpent" INTEGER DEFAULT 0 CHECK ("timeSpent" >= 0),
        "lastAccessedAt" TIMESTAMP,
        "completedAt" TIMESTAMP,
        notes TEXT,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("userId", "projectId", "phaseId")
      )
    `);
    console.log('✅ Project progress table created');
    
    // Create indexes
    console.log('📊 Creating indexes...');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_projects_isActive ON projects("isActive")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_projects_order ON projects("order")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_projects_difficulty ON projects(difficulty)');
    
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_phases_projectId ON project_phases("projectId")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_phases_phaseNumber ON project_phases("phaseNumber")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_phases_phaseType ON project_phases("phaseType")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_phases_isActive ON project_phases("isActive")');
    
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_progress_userId ON project_progress("userId")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_progress_projectId ON project_progress("projectId")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_progress_phaseId ON project_progress("phaseId")');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_project_progress_status ON project_progress(status)');
    
    console.log('✅ Indexes created');
    
    // Check if data already exists
    const [existingProjects] = await sequelize.query('SELECT COUNT(*) as count FROM projects');
    if (existingProjects[0].count > 0) {
      console.log('ℹ️  Projects already exist, skipping data seeding');
      console.log('🎉 Setup completed successfully!');
      return;
    }
    
    // Insert sample projects
    console.log('📋 Inserting sample projects...');
    
    // Project 1: E-Commerce Web Application
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
    
    // Insert phases for Project 1
    const project1Phases = [
      ['Phase 1 - BRD (Business Requirements Document)', 'Define project scope, requirements, and technical specifications', 1, 'BRD', 'Create comprehensive business requirements document including stakeholder analysis, functional requirements, and technical specifications.', '1. Identify stakeholders and their needs\n2. Define functional requirements\n3. Create technical specifications\n4. Perform risk assessment\n5. Create project timeline', 8, 1],
      ['Phase 2 - UI/UX (User Interface/User Experience)', 'Design user interface and user experience for the e-commerce platform', 2, 'UI/UX', 'Design intuitive and responsive user interfaces for the e-commerce platform including wireframes, prototypes, and design system.', '1. Create user personas\n2. Design wireframes\n3. Create high-fidelity prototypes\n4. Develop design system\n5. Conduct usability testing', 8, 2],
      ['Phase 3 - Development', 'Implement the e-commerce application using React, Node.js, and PostgreSQL', 3, 'Development', 'Build the complete e-commerce application with all features including user authentication, product catalog, shopping cart, and payment integration.', '1. Set up development environment\n2. Implement backend API\n3. Build frontend components\n4. Integrate database\n5. Implement authentication', 16, 3],
      ['Phase 4 - Testing & Quality Assurance', 'Test the application thoroughly and ensure quality standards', 4, 'Testing', 'Comprehensive testing including unit tests, integration tests, and user acceptance testing.', '1. Write unit tests\n2. Perform integration testing\n3. Conduct user acceptance testing\n4. Performance testing\n5. Security testing', 4, 4],
      ['Phase 5 - Deployment & Launch', 'Deploy the application to production and launch', 5, 'Deployment', 'Deploy the e-commerce application to production environment and ensure smooth launch.', '1. Set up production environment\n2. Configure CI/CD pipeline\n3. Deploy application\n4. Monitor performance\n5. Launch and support', 4, 5]
    ];
    
    for (const phase of project1Phases) {
      await sequelize.query(`
        INSERT INTO project_phases ("projectId", title, description, "phaseNumber", "phaseType", content, instructions, "estimatedDuration", "isActive", "order")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?)
      `, {
        replacements: [project1Id, ...phase]
      });
    }
    console.log('✅ Project 1 and phases created');
    
    // Project 2: Data Analytics Dashboard
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
    
    // Insert phases for Project 2
    const project2Phases = [
      ['Phase 1 - BRD (Business Requirements Document)', 'Define data requirements and analytics objectives', 1, 'BRD', 'Create comprehensive requirements document for data analytics dashboard including data sources, metrics, and reporting needs.', '1. Identify data sources\n2. Define key metrics\n3. Create reporting requirements\n4. Plan data architecture\n5. Set performance goals', 7, 1],
      ['Phase 2 - UI/UX (User Interface/User Experience)', 'Design dashboard interface and user experience', 2, 'UI/UX', 'Design intuitive dashboard interface with focus on data visualization and user experience.', '1. Create dashboard wireframes\n2. Design data visualization layouts\n3. Plan user interactions\n4. Create responsive design\n5. Test usability', 7, 2],
      ['Phase 3 - Development', 'Build the analytics dashboard with data processing and visualization', 3, 'Development', 'Implement the complete analytics dashboard with data processing, visualization, and real-time updates.', '1. Set up data pipeline\n2. Implement visualization components\n3. Create interactive features\n4. Add real-time updates\n5. Optimize performance', 14, 3],
      ['Phase 4 - Testing & Quality Assurance', 'Test dashboard functionality and data accuracy', 4, 'Testing', 'Comprehensive testing of dashboard functionality, data accuracy, and performance.', '1. Test data accuracy\n2. Validate visualizations\n3. Performance testing\n4. User acceptance testing\n5. Security testing', 3, 4],
      ['Phase 5 - Deployment & Launch', 'Deploy dashboard and set up monitoring', 5, 'Deployment', 'Deploy the analytics dashboard to production and set up monitoring and maintenance.', '1. Deploy to production\n2. Set up monitoring\n3. Configure alerts\n4. User training\n5. Launch and support', 4, 5]
    ];
    
    for (const phase of project2Phases) {
      await sequelize.query(`
        INSERT INTO project_phases ("projectId", title, description, "phaseNumber", "phaseType", content, instructions, "estimatedDuration", "isActive", "order")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?)
      `, {
        replacements: [project2Id, ...phase]
      });
    }
    console.log('✅ Project 2 and phases created');
    
    // Project 3: AI-Powered Learning Assistant
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
    
    // Insert phases for Project 3
    const project3Phases = [
      ['Phase 1 - BRD (Business Requirements Document)', 'Define AI requirements and learning objectives', 1, 'BRD', 'Create comprehensive requirements document for AI-powered learning assistant including AI capabilities and learning objectives.', '1. Define AI capabilities\n2. Identify learning objectives\n3. Plan AI architecture\n4. Set performance metrics\n5. Consider ethical implications', 9, 1],
      ['Phase 2 - UI/UX (User Interface/User Experience)', 'Design AI-powered learning interface', 2, 'UI/UX', 'Design intuitive interface for AI learning assistant with focus on conversational UI and learning experience.', '1. Design conversational interface\n2. Create learning flow diagrams\n3. Plan AI interaction patterns\n4. Design feedback systems\n5. Test user experience', 9, 2],
      ['Phase 3 - Development', 'Implement AI learning assistant with machine learning', 3, 'Development', 'Build the complete AI learning assistant with natural language processing and machine learning capabilities.', '1. Set up AI development environment\n2. Implement NLP features\n3. Build learning algorithms\n4. Create AI interface\n5. Integrate machine learning models', 18, 3],
      ['Phase 4 - Testing & Quality Assurance', 'Test AI functionality and learning effectiveness', 4, 'Testing', 'Comprehensive testing of AI functionality, learning effectiveness, and system performance.', '1. Test AI model accuracy\n2. Validate learning algorithms\n3. Performance testing\n4. User acceptance testing\n5. Ethical AI testing', 5, 4],
      ['Phase 5 - Deployment & Launch', 'Deploy AI assistant and monitor performance', 5, 'Deployment', 'Deploy the AI learning assistant to production and set up monitoring and continuous learning.', '1. Deploy AI models\n2. Set up monitoring\n3. Configure continuous learning\n4. User training\n5. Launch and support', 4, 5]
    ];
    
    for (const phase of project3Phases) {
      await sequelize.query(`
        INSERT INTO project_phases ("projectId", title, description, "phaseNumber", "phaseType", content, instructions, "estimatedDuration", "isActive", "order")
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, ?)
      `, {
        replacements: [project3Id, ...phase]
      });
    }
    console.log('✅ Project 3 and phases created');
    
    console.log('🎉 All projects and phases created successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the setup
setupProjects()
  .then(() => {
    console.log('✅ Setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  });
