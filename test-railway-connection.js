const { PrismaClient } = require("@prisma/client");

async function testRailwayConnection() {
  console.log("🚀 Testing Railway MySQL Connection...\n");

  const prisma = new PrismaClient();

  try {
    // Test basic connection
    console.log("1. Testing database connection...");
    await prisma.$connect();
    console.log("✅ Database connection successful!\n");

    // Test a simple query
    console.log("2. Testing database query...");
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database query successful!");
    console.log("📊 Query result:", result);

    // Test if tables exist
    console.log("\n3. Checking existing tables...");
    const tables = await prisma.$queryRaw`SHOW TABLES`;
    console.log("📋 Existing tables:", tables);

    console.log("\n🎉 Railway MySQL connection is working perfectly!");
    console.log("✅ You can now run migrations and deploy to Vercel!");
  } catch (error) {
    console.error("❌ Railway connection failed:", error.message);
    console.error("\n🔧 Troubleshooting tips:");
    console.error("1. Check your DATABASE_URL in .env file");
    console.error("2. Make sure Railway MySQL service is running");
    console.error("3. Verify the connection string format");
    console.error("4. Check if the host name is correct (not localhost)");
  } finally {
    await prisma.$disconnect();
  }
}

testRailwayConnection();
