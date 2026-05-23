import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await dbConnect();

    // Check if using mock database
    let user;
    if (db && typeof db.findUser === 'function') {
      // Mock database - find by email
      user = await db.findUser(payload.email);
    } else {
      // MongoDB database
      user = await User.findById(payload.userId);
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
