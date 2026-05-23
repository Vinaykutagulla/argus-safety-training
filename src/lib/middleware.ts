import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    return handler(req, payload);
  };
}

export function withRole(...allowedRoles: string[]) {
  return (handler: Function) => {
    return async (req: NextRequest) => {
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

      if (!allowedRoles.includes(payload.role)) {
        return NextResponse.json(
          { error: 'Forbidden: Insufficient permissions' },
          { status: 403 }
        );
      }

      return handler(req, payload);
    };
  };
}
