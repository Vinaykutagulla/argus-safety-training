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

    const db = await dbConnect();
    const data = await req.json();

    const caseId = generateCaseId();

    // Create case with minimal required fields
    const caseData = {
      ...data,
      caseId,
      createdBy: payload.userId,
      administration: {
        receiptDate: data.receiptDate || new Date(),
        caseClassification: data.caseClassification || 'Spontaneous',
        reportType: data.reportType || 'Initial',
        primaryReporterType: data.primaryReporterType || 'Physician',
        countryOfOccurrence: data.countryOfOccurrence || 'USA',
        awarenessDate: data.awarenessDate || new Date(),
        isPregnancyCase: data.isPregnancyCase || false,
      },
      patient: {
        initials: data.patient?.initials || 'N/A',
        age: data.patient?.age || 0,
        sex: data.patient?.sex || 'Unknown',
        medicalHistory: data.patient?.medicalHistory || '',
      },
      reaction: {
        verbatimTerm: data.reaction?.verbatimTerm || 'Unknown',
        meddraPreferredTerm: data.reaction?.meddraPreferredTerm || 'Unknown',
        meddraCode: data.reaction?.meddraCode || 'UNKNOWN',
        meddraSoc: data.reaction?.meddraSoc || 'Unknown',
        outcome: data.reaction?.outcome || 'Unknown',
        seriousnessCriteria: data.reaction?.seriousnessCriteria || [],
      },
      drug: {
        tradeName: data.drug?.tradeName || data.products?.[0]?.productName || 'Unknown',
        activeSubstance: data.drug?.activeSubstance || data.products?.[0]?.activeSubstance || 'Unknown',
        drugRole: data.drug?.drugRole || 'Suspect',
        indication: data.drug?.indication || '',
      },
      narrative: {
        caseNarrative: data.narrative || 'Case entry in progress',
        labTests: data.labTests || '',
      },
      reporter: {
        name: data.reporter?.name || payload.userId,
        qualification: data.reporter?.qualification || 'Analyst',
        country: data.reporter?.country || 'USA',
      },
      auditTrail: [
        {
          action: 'Case Created',
          performedBy: payload.userId,
          timestamp: new Date(),
          details: 'Case intake initiated by student',
        },
      ],
    };

    // Try to save with MongoDB, or use mock database
    if (db && typeof db.createCase === 'function') {
      // Mock database
      const savedCase = await db.createCase(caseData);
      return NextResponse.json(savedCase, { status: 201 });
    }

    // MongoDB path
    const aeCase = new AECase(caseData);
    await aeCase.save();

    return NextResponse.json(aeCase, { status: 201 });
  } catch (error) {
    console.error('Create case error:', error);
    
    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to create case',
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
