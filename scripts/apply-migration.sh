#!/bin/bash

echo "🔄 Applying Appwrite to Prisma Migration..."

# Backup original files
echo "📦 Creating backups..."
mkdir -p backups
cp lib/actions/patient.actions.ts backups/patient.actions.appwrite.backup.ts 2>/dev/null || echo "⚠️  patient.actions.ts not found"
cp lib/actions/appointment.actions.ts backups/appointment.actions.appwrite.backup.ts 2>/dev/null || echo "⚠️  appointment.actions.ts not found"

# Replace action files
echo "🔄 Replacing action files..."
if [ -f "lib/actions/patient.actions.new.ts" ]; then
    mv lib/actions/patient.actions.new.ts lib/actions/patient.actions.ts
    echo "✅ Replaced patient.actions.ts"
else
    echo "❌ patient.actions.new.ts not found"
fi

if [ -f "lib/actions/appointment.actions.new.ts" ]; then
    mv lib/actions/appointment.actions.new.ts lib/actions/appointment.actions.ts
    echo "✅ Replaced appointment.actions.ts"
else
    echo "❌ appointment.actions.new.ts not found"
fi

# Remove Appwrite config
echo "🗑️  Removing Appwrite configuration..."
if [ -f "lib/appwrite.config.ts" ]; then
    mv lib/appwrite.config.ts backups/appwrite.config.backup.ts
    echo "✅ Backed up appwrite.config.ts"
fi

# Update package.json to remove Appwrite dependency
echo "📦 Updating dependencies..."
if command -v npm &> /dev/null; then
    npm uninstall node-appwrite
    echo "✅ Removed node-appwrite dependency"
else
    echo "⚠️  npm not found, please manually remove node-appwrite from package.json"
fi

echo ""
echo "🎉 Migration files applied successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your MySQL database"
echo "2. Update your .env.local file with DATABASE_URL"
echo "3. Run: npx prisma migrate dev --name init"
echo "4. Update component imports to use new types"
echo "5. Test the application"
echo ""
echo "📖 See MIGRATION_GUIDE.md for detailed instructions"
