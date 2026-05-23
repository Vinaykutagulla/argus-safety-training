import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';

function generateCaseId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `CASE-${year}-${random}`;
}

export async function GET(req: NextRequest) {
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

    const db = await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Check if using mock database
    if (db && typeof db.getCases === 'function') {
      // Mock database
      const allCases = await db.getCases();
      const skip = (page - 1) * limit;
      const cases = allCases.slice(skip, skip + limit);
      
      return NextResponse.json({
        cases,
        pagination: {
          page,
          limit,
          total: allCases.length,
        },
      });
    }

    // MongoDB path - ensure connection is established
    if (!db.connection || db.connection.readyState !== 1) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      );
    }

    const status = searchParams.get('status');
    const product = searchParams.get('product');
    const seriousness = searchParams.get('seriousness');
    const search = searchParams.get('search');

    const filter: any = {};

    if (status) filter.status = status;
    if (product) filter['drug.tradeName'] = { $regex: product, $options: 'i' };
    if (seriousness) filter['reaction.seriousnessCriteria'] = seriousness;
    if (search) {
      filter.$or = [
        { caseId: { $regex: search, $options: 'i' } },
        { 'drug.tradeName': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const cases = await AECase.find(filter)
      .sort({ 'administration.receiptDate': -1 })
      .skip(skip)
      .limit(limit);

    const total = await AECase.countDocuments(filter);

    return NextResponse.json({
      cases,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get cases error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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

    const data = await req.json();

    const caseId = generateCaseId();
    const aeCase = new AECase({
      ...data,
      caseId,
      createdBy: payload.userId,
      auditTrail: [
        {
          action: 'Case Created',
          performedBy: payload.userId,
          timestamp: new Date(),
          details: 'Case intake initiated',
        },
      ],
    });

    await aeCase.save();

    return NextResponse.json(aeCase, { status: 201 });
  } catch (error) {
    console.error('Create case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
