#!/usr/bin/env node
/**
 * Diagnostic Script: Test MongoDB Connection & Case Persistence
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Parse .env.local manually
let MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.+)$/m);
    if (match) {
      MONGODB_URI = match[1];
    }
  }
}

console.log('\n🔍 DATABASE DIAGNOSTIC\n');
console.log('=' .repeat(60));

// Check environment variable
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

console.log('✓ MONGODB_URI loaded:', MONGODB_URI.substring(0, 50) + '...');

// Simple AECase schema for testing
const aeCaseSchema = new mongoose.Schema({
  caseId: String,
  status: String,
  reportType: String,
  receiptDate: Date,
  drug: {
    tradeName: String,
    genericName: String,
  },
  patient: {
    age: Number,
    sex: String,
  },
  reaction: {
    description: String,
    seriousnessCriteria: [String],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AECase = mongoose.model('AECase', aeCaseSchema);

// Connect and test
async function testConnection() {
  try {
    console.log('\n📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✓ Connected to MongoDB');

    // Count existing cases
    const caseCount = await AECase.countDocuments();
    console.log(`\n📊 Existing cases in database: ${caseCount}`);

    if (caseCount > 0) {
      console.log('\n📋 Existing cases:');
      const cases = await AECase.find().limit(5);
      cases.forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.caseId} (${c.status}) - Created: ${c.createdAt}`);
      });
    }

    // Test: Create a test case
    console.log('\n🧪 Testing case creation...');
    const testCase = new AECase({
      caseId: `TEST-${Date.now()}`,
      status: 'Draft',
      reportType: 'Spontaneous',
      receiptDate: new Date(),
      drug: {
        tradeName: 'Test Drug',
        genericName: 'Test Generic',
      },
      patient: {
        age: 45,
        sex: 'M',
      },
      reaction: {
        description: 'Test reaction',
        seriousnessCriteria: ['Other'],
      },
    });

    await testCase.save();
    console.log(`✓ Test case created: ${testCase.caseId}`);

    // Verify it was saved
    const retrieved = await AECase.findById(testCase._id);
    if (retrieved) {
      console.log('✓ Test case retrieved from database');
    } else {
      console.log('❌ Test case NOT found after save');
    }

    // Show final count
    const finalCount = await AECase.countDocuments();
    console.log(`\n📊 Total cases now: ${finalCount}`);

    console.log('\n✅ MongoDB connection working! Cases should persist.');
    console.log('\n⚠️  IMPORTANT: Restart your backend server now!');
    console.log('   Kill terminal running: npm run dev');
    console.log('   Then restart it to apply .env.local changes\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your MongoDB Atlas connection string');
    console.log('2. Verify IP address is whitelisted in Atlas security');
    console.log('3. Ensure .env.local has correct MONGODB_URI');
    console.log('4. Check internet connection');
    process.exit(1);
  }
}

testConnection();
