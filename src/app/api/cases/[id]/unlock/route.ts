import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
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

    if (!['supervisor', 'admin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();

    const aeCase = await AECase.findById(params.id);
    if (!aeCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    aeCase.workflow = aeCase.workflow || {};
    aeCase.workflow.lockedBy = undefined;
    aeCase.workflow.lockedAt = undefined;
    aeCase.status = 'Open';
    aeCase.auditTrail.push({
      action: 'Case Unlocked',
      performedBy: payload.userId,
      timestamp: new Date(),
      details: 'Case unlocked for further editing',
    });

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
