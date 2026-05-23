import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';

export async function GET(
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

    await dbConnect();

    const aeCase = await AECase.findById(params.id);

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

    await dbConnect();

    const aeCase = await AECase.findById(params.id);

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

    Object.assign(aeCase, data);
    aeCase.updatedBy = payload.userId;
    aeCase.auditTrail.push({
      action: 'Case Updated',
      performedBy: payload.userId,
      timestamp: new Date(),
      details: 'Case information updated',
    });

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

    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();

    const aeCase = await AECase.findByIdAndDelete(params.id);

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
