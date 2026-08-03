import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    if (!['supervisor', 'admin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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

    const updatedCase = {
      ...aeCase,
      workflow: {
        ...(aeCase.workflow || {}),
        lockedBy: undefined,
        lockedAt: undefined,
      },
      status: 'Open',
      auditTrail: [
        ...(aeCase.auditTrail || []),
        {
          action: 'Case Unlocked',
          performedBy: payload.userId,
          timestamp: new Date(),
          details: 'Case unlocked for further editing',
        },
      ],
    };

    if (db && typeof db.updateCase === 'function') {
      const savedCase = await db.updateCase(params.id, updatedCase);
      return NextResponse.json(savedCase);
    }

    Object.assign(aeCase, updatedCase);
    await aeCase.save();

    return NextResponse.json(aeCase);
  } catch (error) {
    console.error('Unlock case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
