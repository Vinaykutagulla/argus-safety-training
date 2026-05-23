import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, email, password, role, department } = await req.json();

    if (!name || !email || !password || !role || !department) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
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
      { status: 201 }
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
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
