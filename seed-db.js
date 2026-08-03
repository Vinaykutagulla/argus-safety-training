const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://firstpharmajob_db_user:Vinay%401997@cluster0.q0hgd3v.mongodb.net/argus-pv?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  department: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const DEMO_USERS = [
  {
    name: 'Admin User',
    email: 'admin@argus.com',
    password: 'password123',
    role: 'admin',
    department: 'Safety',
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create users (password will be hashed by pre-save hook)
    for (const userData of DEMO_USERS) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${userData.email}`);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();
