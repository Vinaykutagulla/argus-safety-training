const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Define User schema inline
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  department: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const uatUsers = [
  {
    name: 'Poonam Laxman Bedge',
    email: 'poonambedge03@gmail.com',
    role: 'analyst',
    department: 'Pharmacovigilance',
  },
  {
    name: 'Katari Kishore Rathna Prasad',
    email: 'kishorerathnaprasad@gmail.com',
    role: 'analyst',
    department: 'Pharmacovigilance',
  },
  {
    name: 'Sankarapu Sreenivas',
    email: 'sreenivassankarapu14@gmail.com',
    role: 'safety_officer',
    department: 'Safety',
  },
  {
    name: 'K Sravani',
    email: 'kopeerlashravani@gmail.com',
    role: 'analyst',
    department: 'Data Management',
  },
  {
    name: 'Shaik Hameed Basha',
    email: 'SHAIKHAMEED.KLM@GMAIL.COM',
    role: 'analyst',
    department: 'Pharmacovigilance',
  },
  {
    name: 'A. Chandra Prakash',
    email: 'achandraprakash2805@gmail.com',
    role: 'supervisor',
    department: 'Medical Affairs',
  },
  {
    name: 'Donthi Reddy Ramesh Reddy',
    email: 'drrameshreddy25@gmail.com',
    role: 'analyst',
    department: 'Pharmacovigilance',
  },
  {
    name: 'Posina Sreevani',
    email: 'posina.sreevani21@gmail.com',
    role: 'analyst',
    department: 'Data Management',
  },
  {
    name: 'Koduri Naga Venkata Nandini',
    email: 'nandinikoduri11@gmail.com',
    role: 'analyst',
    department: 'Pharmacovigilance',
  },
  {
    name: 'Juturu Srivallika',
    email: 'srivallikaj694@gmail.com',
    role: 'safety_officer',
    department: 'Safety',
  },
];

async function createUATUsers() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://firstpharmajob_db_user:Vinay%401997@cluster0.q0hgd3v.mongodb.net/argus-pv';
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable not set');
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log('✅ Connected to MongoDB');

    // Create users
    const defaultPassword = 'UAT@2026';
    const hashedPassword = await bcryptjs.hash(defaultPassword, 10);

    let created = 0;
    let skipped = 0;

    for (const userData of uatUsers) {
      try {
        // Check if user exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
          console.log(`⏭️  Skipped: ${userData.email} (already exists)`);
          skipped++;
          continue;
        }

        // Create new user
        const user = new User({
          ...userData,
          password: hashedPassword,
        });

        await user.save();
        console.log(`✅ Created: ${userData.name} (${userData.email})`);
        created++;
      } catch (err) {
        console.error(`❌ Error creating ${userData.email}:`, err.message);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${created}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`\n🔑 Default Password: ${defaultPassword}`);
    console.log(`\n✨ UAT users ready for testing!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createUATUsers();
