import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get('auth-token')?.value;
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

    await dbConnect();

    const { assignedTo } = await req.json();

    const aeCase = await AECase.findById(params.id);
    if (!aeCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    aeCase.workflow = aeCase.workflow || {};
    aeCase.workflow.assignedTo = assignedTo;
    aeCase.auditTrail.push({
      action: 'Case Assigned',
      performedBy: payload.userId,
      timestamp: new Date(),
      details: `Case assigned to ${assignedTo}`,
    });

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
