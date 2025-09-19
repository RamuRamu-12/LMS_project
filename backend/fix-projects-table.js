const { sequelize } = require('./models');

async function fixProjectsTable() {
  try {
    console.log('🔧 Starting projects table fix...\n');

    // Check if projects table exists
    const [tableExists] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'projects'
    `);
    
    if (tableExists.length === 0) {
      console.log('❌ Projects table does not exist. Creating it...');
      
      // Create the projects table with all required columns
      await sequelize.query(`
        CREATE TABLE projects (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          difficulty VARCHAR(20) DEFAULT 'intermediate',
          estimated_duration INTEGER DEFAULT 0,
          status VARCHAR(20) DEFAULT 'active',
          thumbnail TEXT,
          logo TEXT,
          category VARCHAR(100),
          technologies JSON,
          phases JSON,
          is_published BOOLEAN DEFAULT false,
          published_at TIMESTAMP,
          created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      console.log('✅ Created projects table with all required columns');
      return;
    }

    // Check and add missing columns
    const [columns] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects'
    `);
    
    const existingColumns = columns.map(col => col.column_name);
    console.log('📊 Existing columns:', existingColumns);

    // Add created_by column if missing
    if (!existingColumns.includes('created_by')) {
      console.log('🔧 Adding created_by column...');
      
      // First, add the column as nullable
      await sequelize.query(`
        ALTER TABLE projects 
        ADD COLUMN created_by INTEGER REFERENCES users(id) ON DELETE CASCADE
      `);
      
      // Check if we have any users to assign as creator
      const [users] = await sequelize.query(`
        SELECT id FROM users LIMIT 1
      `);
      
      if (users.length > 0) {
        const defaultUserId = users[0].id;
        console.log(`📝 Updating existing projects with user ID ${defaultUserId} as creator...`);
        
        // Update existing rows to have a creator
        await sequelize.query(`
          UPDATE projects 
          SET created_by = ${defaultUserId} 
          WHERE created_by IS NULL
        `);
        
        // Now make the column NOT NULL
        await sequelize.query(`
          ALTER TABLE projects 
          ALTER COLUMN created_by SET NOT NULL
        `);
        
        console.log('✅ Added created_by column and updated existing projects');
      } else {
        console.log('⚠️  No users found. Column added but remains nullable.');
      }
    } else {
      console.log('✅ created_by column already exists');
    }

    // Handle estimated_duration column (check both camelCase and snake_case)
    if (!existingColumns.includes('estimated_duration') && !existingColumns.includes('estimatedDuration')) {
      console.log('🔧 Adding estimated_duration column...');
      await sequelize.query(`
        ALTER TABLE projects 
        ADD COLUMN estimated_duration INTEGER DEFAULT 0
      `);
      console.log('✅ Added estimated_duration column');
    } else if (existingColumns.includes('estimatedDuration') && !existingColumns.includes('estimated_duration')) {
      console.log('🔧 Renaming estimatedDuration to estimated_duration...');
      await sequelize.query(`
        ALTER TABLE projects 
        RENAME COLUMN "estimatedDuration" TO estimated_duration
      `);
      console.log('✅ Renamed estimatedDuration to estimated_duration');
    } else {
      console.log('✅ estimated_duration column already exists');
    }

    // Add other potentially missing columns
    const requiredColumns = [
      { name: 'updated_by', type: 'INTEGER REFERENCES users(id) ON DELETE SET NULL' },
      { name: 'technologies', type: 'JSON' },
      { name: 'phases', type: 'JSON' },
      { name: 'is_published', type: 'BOOLEAN DEFAULT false' },
      { name: 'published_at', type: 'TIMESTAMP' }
    ];

    for (const col of requiredColumns) {
      if (!existingColumns.includes(col.name)) {
        console.log(`🔧 Adding ${col.name} column...`);
        await sequelize.query(`
          ALTER TABLE projects 
          ADD COLUMN ${col.name} ${col.type}
        `);
        console.log(`✅ Added ${col.name} column`);
      } else {
        console.log(`✅ ${col.name} column already exists`);
      }
    }

    console.log('\n🎉 Projects table fix completed successfully!');
    console.log('🚀 You can now access realtime projects in the admin UI.');

  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the fix
fixProjectsTable()
  .then(() => {
    console.log('🎉 Projects table fix completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fix failed:', error);
    process.exit(1);
  });
