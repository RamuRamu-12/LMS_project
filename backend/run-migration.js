const { sequelize } = require('./models');
const { QueryInterface } = require('sequelize');

async function runMigration() {
  try {
    console.log('🔄 Starting migration to fix enrollment status enum...');
    
    // Check current enum values
    const [results] = await sequelize.query(`
      SELECT column_name, column_type 
      FROM information_schema.columns 
      WHERE table_name = 'enrollments' 
      AND column_name = 'status'
    `);
    
    console.log('📊 Current status column type:', results[0]?.column_type);
    
    // Check if 'in-progress' is in the current enum
    const currentType = results[0]?.column_type || '';
    if (currentType.includes('in-progress')) {
      console.log('✅ Enum already includes "in-progress" - no migration needed');
      return;
    }
    
    // Update the enum to include the correct values
    console.log('🔧 Updating enum values...');
    
    // First, let's see what values currently exist in the database
    const [statusValues] = await sequelize.query(`
      SELECT DISTINCT status FROM enrollments
    `);
    
    console.log('📋 Current status values in database:', statusValues.map(v => v.status));
    
    // Update the column to use the correct enum values
    await sequelize.query(`
      ALTER TABLE enrollments 
      ALTER COLUMN status TYPE VARCHAR(20)
    `);
    
    await sequelize.query(`
      ALTER TABLE enrollments 
      ALTER COLUMN status TYPE ENUM('enrolled', 'completed', 'dropped')
    `);
    
    console.log('✅ Successfully updated enrollment status enum!');
    console.log('📝 New enum values: enrolled, completed, dropped');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    // If the enum change fails, try a different approach
    if (error.message.includes('enum')) {
      console.log('🔄 Trying alternative approach...');
      
      try {
        // Update any 'in-progress' values to 'enrolled'
        await sequelize.query(`
          UPDATE enrollments 
          SET status = 'enrolled' 
          WHERE status = 'in-progress' OR status NOT IN ('enrolled', 'completed', 'dropped')
        `);
        
        console.log('✅ Updated invalid status values to "enrolled"');
        
        // Now try to change the column type
        await sequelize.query(`
          ALTER TABLE enrollments 
          ALTER COLUMN status TYPE VARCHAR(20)
        `);
        
        await sequelize.query(`
          ALTER TABLE enrollments 
          ALTER COLUMN status TYPE ENUM('enrolled', 'completed', 'dropped')
        `);
        
        console.log('✅ Successfully updated enum with alternative approach!');
        
      } catch (altError) {
        console.error('❌ Alternative approach also failed:', altError.message);
        console.log('💡 Manual fix needed: Update the database enum values manually');
      }
    }
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the migration
runMigration()
  .then(() => {
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
