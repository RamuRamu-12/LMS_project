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

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Test creating the projects table
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
    
    // Test creating the project_phases table
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
    
    // Test creating the project_progress table
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
    
    console.log('🎉 All tables created successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

testConnection();
