import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await dbConnect();

    let users;
    
    // Check if using mock database
    if (db && typeof db.getUsers === 'function') {
      // Mock database
      users = await db.getUsers();
    } else {
      // Real MongoDB
      users = await User.find({}, '-password').sort({ createdAt: -1 });
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await dbConnect();

    const { name, email, password, role, department } = await req.json();

    let userResponse;

    // Check if using mock database
    if (db && typeof db.createUser === 'function') {
      // Mock database
      const createdUser = await db.createUser({
        name,
        email,
        password,
        role,
        department,
        isActive: true,
      });

      userResponse = {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        department: createdUser.department,
      };
    } else {
      // Real MongoDB
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }

      const user = new User({
        name,
        email,
        password,
        role,
        department,
      });

      await user.save();

      userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      };
    }

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
