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

    if (!['safety_officer', 'supervisor', 'admin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await dbConnect();

    const { assignedTo } = await req.json();

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
        assignedTo,
      },
      auditTrail: [
        ...(aeCase.auditTrail || []),
        {
          action: 'Case Assigned',
          performedBy: payload.userId,
          timestamp: new Date(),
          details: `Case assigned to ${assignedTo}`,
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
    console.error('Assign case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
