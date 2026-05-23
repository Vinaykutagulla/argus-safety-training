require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const MedDRA = require('../src/models/MedDRA');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/argus-pv', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    await User.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123', salt);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@argus.com',
        password: hashedPassword,
        role: 'admin',
        department: 'Administration',
        isActive: true
      },
      {
        name: 'Dr. Pharmacist',
        email: 'pharmacist@argus.com',
        password: hashedPassword,
        role: 'pharmacist',
        department: 'Pharmacy',
        isActive: true
      },
      {
        name: 'Dr. Physician',
        email: 'physician@argus.com',
        password: hashedPassword,
        role: 'physician',
        department: 'Clinical',
        isActive: true
      },
      {
        name: 'Viewer User',
        email: 'viewer@argus.com',
        password: hashedPassword,
        role: 'viewer',
        department: 'Monitoring',
        isActive: true
      }
    ];

    await User.insertMany(users);
    console.log('✓ Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedMedDRA = async () => {
  try {
    await MedDRA.deleteMany({});

    const meddraData = [
      {
        meddraCode: '10016256',
        preferredTerm: 'Fever',
        lowLevelTerm: 'Fever',
        highLevelGroupingTerm: 'Pyrexia',
        systemOrganClass: 'General Disorders and Administration Site Conditions',
        meddraVersion: 'v27.0',
        seriousness: ['hospitalization', 'death']
      },
      {
        meddraCode: '10013199',
        preferredTerm: 'Dizziness',
        lowLevelTerm: 'Dizziness',
        highLevelGroupingTerm: 'Neurological Disorders',
        systemOrganClass: 'Nervous System Disorders',
        meddraVersion: 'v27.0',
        seriousness: []
      },
      {
        meddraCode: '10011224',
        preferredTerm: 'Headache',
        lowLevelTerm: 'Headache',
        highLevelGroupingTerm: 'Neurological Disorders',
        systemOrganClass: 'Nervous System Disorders',
        meddraVersion: 'v27.0',
        seriousness: []
      },
      {
        meddraCode: '10019800',
        preferredTerm: 'Nausea',
        lowLevelTerm: 'Nausea',
        highLevelGroupingTerm: 'Gastrointestinal Disorders',
        systemOrganClass: 'Gastrointestinal Disorders',
        meddraVersion: 'v27.0',
        seriousness: []
      },
      {
        meddraCode: '10009671',
        preferredTerm: 'Vomiting',
        lowLevelTerm: 'Vomiting',
        highLevelGroupingTerm: 'Gastrointestinal Disorders',
        systemOrganClass: 'Gastrointestinal Disorders',
        meddraVersion: 'v27.0',
        seriousness: ['hospitalization']
      },
      {
        meddraCode: '10018841',
        preferredTerm: 'Rash',
        lowLevelTerm: 'Rash',
        highLevelGroupingTerm: 'Skin and Subcutaneous Tissue Disorders',
        systemOrganClass: 'Skin and Subcutaneous Tissue Disorders',
        meddraVersion: 'v27.0',
        seriousness: []
      },
      {
        meddraCode: '10047561',
        preferredTerm: 'Pruritus',
        lowLevelTerm: 'Pruritus',
        highLevelGroupingTerm: 'Skin and Subcutaneous Tissue Disorders',
        systemOrganClass: 'Skin and Subcutaneous Tissue Disorders',
        meddraVersion: 'v27.0',
        seriousness: []
      },
      {
        meddraCode: '10001688',
        preferredTerm: 'Asthenia',
        lowLevelTerm: 'Asthenia',
        highLevelGroupingTerm: 'General Disorders and Administration Site Conditions',
        systemOrganClass: 'General Disorders and Administration Site Conditions',
        meddraVersion: 'v27.0',
        seriousness: []
      }
    ];

    await MedDRA.insertMany(meddraData);
    console.log('✓ MedDRA codes seeded successfully');
  } catch (error) {
    console.error('Error seeding MedDRA:', error);
  }
};

const seed = async () => {
  await connectDB();
  console.log('\n🌱 Starting database seeding...\n');

  await seedUsers();
  await seedMedDRA();

  console.log('\n✓ Database seeding completed!\n');
  console.log('Sample Login Credentials:');
  console.log('  Admin: admin@argus.com / demo123');
  console.log('  Pharmacist: pharmacist@argus.com / demo123');
  console.log('  Physician: physician@argus.com / demo123');
  console.log('  Viewer: viewer@argus.com / demo123\n');

  await mongoose.connection.close();
};

seed();
