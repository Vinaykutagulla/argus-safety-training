import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';
import { requirePermission } from '@/lib/rbac';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = await dbConnect();

    let aeCase;
    if (db && typeof db.getCaseById === 'function') {
      aeCase = await db.getCaseById(id);
    } else {
      aeCase = await AECase.findById(id);
    }

    if (!aeCase) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(aeCase);
  } catch (error) {
    console.error('Get case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check role-based permission
    if (!requirePermission(payload.role as any, 'canEditCase')) {
      return NextResponse.json(
        { error: 'Insufficient permissions. You do not have access to edit cases.' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const db = await dbConnect();

    let aeCase = null;
    if (db && typeof db.getCaseById === 'function') {
      aeCase = await db.getCaseById(id);
    } else {
      aeCase = await AECase.findById(id);
    }

    if (!aeCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    if (aeCase.workflow?.lockedBy && aeCase.workflow.lockedBy !== payload.userId) {
      return NextResponse.json(
        { error: 'Case is locked by another user' },
        { status: 403 }
      );
    }

    const data = await req.json();

    const updatedCase = {
      ...aeCase,
      ...data,
      updatedBy: payload.userId,
      auditTrail: [
        ...(aeCase.auditTrail || []),
        {
          action: 'Case Updated',
          performedBy: payload.userId,
          timestamp: new Date(),
          details: 'Case information updated',
        },
      ],
    };

    if (db && typeof db.updateCase === 'function') {
      const saved = await db.updateCase(id, updatedCase);
      return NextResponse.json(saved);
    }

    Object.assign(aeCase, updatedCase);
    await aeCase.save();

    return NextResponse.json(aeCase);
  } catch (error) {
    console.error('Update case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

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

    const { id } = await params;
    const db = await dbConnect();

    let aeCase = null;
    if (db && typeof db.deleteCase === 'function') {
      aeCase = await db.deleteCase(id);
    } else {
      aeCase = await AECase.findByIdAndDelete(id);
    }

    if (!aeCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Case deleted' });
  } catch (error) {
    console.error('Delete case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
