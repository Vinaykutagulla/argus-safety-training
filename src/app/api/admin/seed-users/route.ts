import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import bcryptjs from 'bcryptjs';

// Default demo users for training purposes
const demoUsers = [
  {
    name: 'Administrator',
    email: 'admin@argus.com',
    password: 'password123',
    role: 'admin',
    department: 'Administration',
  },
  {
    name: 'Safety Officer',
    email: 'officer@argus.com',
    password: 'password123',
    role: 'safety_officer',
    department: 'Safety',
  },
  {
    name: 'Supervisor',
    email: 'supervisor@argus.com',
    password: 'password123',
    role: 'supervisor',
    department: 'Medical Affairs',
  },
  {
    name: 'Data Analyst',
    email: 'analyst@argus.com',
    password: 'password123',
    role: 'analyst',
    department: 'Data Management',
  },
];

export async function POST(req: NextRequest) {
  try {
    // Check for seed password from environment
    const seedPassword = req.headers.get('x-seed-password');
    if (seedPassword !== process.env.SEED_PASSWORD && process.env.NODE_ENV === 'production') {
      // In development, allow seeding without password
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    await dbConnect();

    // Clear existing users (optional - remove in production)
    const clearExisting = req.nextUrl.searchParams.get('clear') === 'true';
    if (clearExisting) {
      await User.deleteMany({});
      console.log('Cleared existing users');
    }

    // Check if users already exist
    const existingUsers = await User.countDocuments({});
    if (existingUsers > 0 && !clearExisting) {
      return NextResponse.json(
        {
          success: false,
          message: 'Users already exist. Use ?clear=true to reset',
          count: existingUsers,
        },
        { status: 409 }
      );
    }

    // Hash passwords and create users one by one so the pre-save middleware runs
    const createdUsers = [];
    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: `Seeded ${createdUsers.length} users`,
        users: createdUsers,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed users error:', error);
    return NextResponse.json(
      {
        error: 'Failed to seed users',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const count = await User.countDocuments({});
    const users = await User.find({}, 'name email role department');

    return NextResponse.json({
      count,
      users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
