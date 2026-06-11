const mongoose = require('mongoose');

// Define schemas inline
const caseSchema = new mongoose.Schema({}, { strict: false });
const reportSchema = new mongoose.Schema({}, { strict: false });

const Case = mongoose.model('Case', caseSchema);
const Report = mongoose.model('Report', reportSchema);

async function clearDemoData() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://firstpharmajob_db_user:Vinay%401997@cluster0.q0hgd3v.mongodb.net/argus-pv';
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log('✅ Connected to MongoDB');

    // Delete all cases
    const deletedCases = await Case.deleteMany({});
    console.log(`🗑️  Deleted ${deletedCases.deletedCount} cases`);

    // Delete all reports
    const deletedReports = await Report.deleteMany({});
    console.log(`🗑️  Deleted ${deletedReports.deletedCount} reports`);

    console.log('\n✨ Demo data cleared successfully!');
    console.log('Database is now clean and ready for fresh testing.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

clearDemoData();
