const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://firstpharmajob_db_user:Vinay%401997@cluster0.q0hgd3v.mongodb.net/argus-pv?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  department: String,
  createdAt: { type: Date, default: Date.now },
});

// Add pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Delete existing admin user
    await User.deleteOne({ email: 'admin@argus.com' });
    console.log('Cleared existing admin user');

    // Create new admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@argus.com',
      password: 'password123',
      role: 'admin',
      department: 'Safety',
    });

    await admin.save();
    console.log('✓ Created admin@argus.com with password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdminUser();

createAdminUser();
