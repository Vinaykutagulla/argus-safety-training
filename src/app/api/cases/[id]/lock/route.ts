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

    // Prefer direct update via db.updateCase (works for mockDb)
    if (db && typeof db.updateCase === 'function') {
      const savedCase = await db.updateCase(id, {
        status: 'Locked',
        workflow: {
          lockedBy: payload.userId,
          lockedAt: new Date(),
        },
      });

      if (savedCase) {
        return NextResponse.json(savedCase);
      }
      // if no savedCase, fall through to try other lookup methods
    }

    let aeCase = null;
    if (db && typeof db.getCaseById === 'function') {
      aeCase = await db.getCaseById(id);
    } else {
      aeCase = await AECase.findById(id);
    }

    // Fallback: if case not found, attempt to read from exported mockDb
    if (!aeCase) {
      try {
        const { mockDb } = await import('@/lib/db');
        if (mockDb && typeof mockDb.getCaseById === 'function') {
          aeCase = await mockDb.getCaseById(id);
        }
      } catch (err) {
        // ignore fallback errors
      }
    }

    if (!aeCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    const updatedCase = {
      ...aeCase,
      workflow: {
        ...(aeCase.workflow || {}),
        lockedBy: payload.userId,
        lockedAt: new Date(),
      },
      status: 'Locked',
      auditTrail: [
        ...(aeCase.auditTrail || []),
        {
          action: 'Case Locked',
          performedBy: payload.userId,
          timestamp: new Date(),
          details: 'Case locked for submission',
        },
      ],
    };

    if (db && typeof db.updateCase === 'function') {
      const savedCase = await db.updateCase(id, updatedCase);
      if (savedCase) return NextResponse.json(savedCase);

      // As a last resort, try to upsert into exported mockDb
      try {
        const { mockDb } = await import('@/lib/db');
        if (mockDb && typeof mockDb.upsertCase === 'function') {
          const upserted = await mockDb.upsertCase(id, updatedCase);
          return NextResponse.json(upserted);
        }
      } catch (err) {
        // ignore
      }

      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    Object.assign(aeCase, updatedCase);
    await aeCase.save();

    return NextResponse.json(aeCase);
  } catch (error) {
    console.error('Lock case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
