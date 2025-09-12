const { sequelize } = require('./models');

async function migrateProjects() {
  try {
    console.log('🔄 Starting Realtime Projects migration...');
    
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
    
    console.log('🎉 Realtime Projects migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Stack:', error.stack);
    throw error;
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the migration
migrateProjects()
  .then(() => {
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
