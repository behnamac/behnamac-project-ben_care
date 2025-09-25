#!/usr/bin/env node

/**
 * Migration script to help transition from Appwrite to Prisma
 * This script provides instructions and helper functions for the migration
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Appwrite to Prisma Migration...\n');

// Step 1: Check if Prisma is set up
const prismaSchemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
if (!fs.existsSync(prismaSchemaPath)) {
  console.error('❌ Prisma schema not found. Please run "npx prisma init" first.');
  process.exit(1);
}

console.log('✅ Prisma schema found');

// Step 2: Check for environment variables
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env.local not found. Please create it from env.example');
  console.log('   cp env.example .env.local');
  console.log('   Then update DATABASE_URL with your MySQL connection string\n');
}

// Step 3: Generate Prisma client
console.log('📦 Generating Prisma client...');
const { execSync } = require('child_process');

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully\n');
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error.message);
  process.exit(1);
}

// Step 4: Database migration instructions
console.log('🗄️  Database Setup Instructions:');
console.log('1. Make sure MySQL is running on your system');
console.log('2. Create a database for the application:');
console.log('   CREATE DATABASE healthcare_db;');
console.log('3. Update your .env.local with the correct DATABASE_URL');
console.log('4. Run the migration:');
console.log('   npx prisma migrate dev --name init');
console.log('5. (Optional) Seed the database:');
console.log('   npx prisma db seed\n');

// Step 5: File replacement instructions
console.log('📁 File Replacement Instructions:');
console.log('1. Replace lib/actions/patient.actions.ts with lib/actions/patient.actions.new.ts');
console.log('2. Replace lib/actions/appointment.actions.ts with lib/actions/appointment.actions.new.ts');
console.log('3. Update imports in components to use new action files');
console.log('4. Remove Appwrite dependencies from package.json');
console.log('5. Update types imports to use prisma.types.ts\n');

// Step 6: Component updates needed
console.log('🔧 Components that need updates:');
const componentsToUpdate = [
  'components/forms/PatientForm.tsx',
  'components/forms/RegisterForm.tsx',
  'components/forms/AppointmentForm.tsx',
  'app/patients/[userId]/register/page.tsx',
  'app/patients/[userId]/new-appointment/page.tsx',
  'app/admin/page.tsx'
];

componentsToUpdate.forEach(component => {
  console.log(`   - ${component}`);
});

console.log('\n✨ Migration preparation complete!');
console.log('📖 Next steps:');
console.log('1. Set up your MySQL database');
console.log('2. Run the Prisma migration');
console.log('3. Replace the action files');
console.log('4. Update component imports');
console.log('5. Test the application');
