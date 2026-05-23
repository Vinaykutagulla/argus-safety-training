import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, mockDb } from '@/lib/db';
import { User } from '@/models/User';
import { generateToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const db = await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Handle mock database
    if (db && typeof db.findUser === 'function') {
      const user = await db.findUser(email);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = generateToken(user._id, user.email, user.role);

      const response = NextResponse.json(
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
          },
          token,
        },
        { status: 200 }
      );

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      return response;
    }

    // Handle MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id.toString(), user.email, user.role);

    const response = NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
        },
        token,
      },
      { status: 200 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
