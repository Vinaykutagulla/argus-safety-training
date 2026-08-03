import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';
import { requirePermission } from '@/lib/rbac';

function generateCaseId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `CASE-${year}-${random}`;
}

function normalizePatientSex(sex?: string): string {
  if (!sex) return 'Unknown';
  const normalized = sex.toString().trim().toLowerCase();
  if (normalized === 'male' || normalized === 'm') return 'M';
  if (normalized === 'female' || normalized === 'f') return 'F';
  return 'Unknown';
}

function normalizeSeriousnessCriteria(seriousness?: string) {
  const map: Record<string, string[]> = {
    'Not Serious': [],
    Serious: ['Other'],
    'Serious - Death': ['Death'],
    'Serious - Hospitalization': ['Hospitalized'],
    'Serious - Disability': ['Disability'],
  };
  return seriousness ? map[seriousness] ?? [seriousness] : [];
}

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
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
        total: allCases.length,
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

    // Build filter object from query parameters
    const filter: any = {};

    const caseId = searchParams.get('caseId');
    const product = searchParams.get('product');
    const country = searchParams.get('country');
    const status = searchParams.get('status');
    const seriousness = searchParams.get('seriousness');
    const reportType = searchParams.get('reportType');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const search = searchParams.get('search');

    // Case ID search
    if (caseId) filter.caseId = { $regex: caseId, $options: 'i' };

    // Product search
    if (product) filter['drug.tradeName'] = { $regex: product, $options: 'i' };

    // Country filter
    if (country) filter['administration.countryOfOccurrence'] = country;

    // Status filter
    if (status) filter.status = status;

    // Seriousness filter
    if (seriousness) filter['reaction.seriousness'] = seriousness;

    // Report type filter
    if (reportType) filter['administration.reportType'] = reportType;

    // Date range filter
    if (fromDate || toDate) {
      filter['administration.receiptDate'] = {};
      if (fromDate) {
        filter['administration.receiptDate'].$gte = new Date(fromDate);
      }
      if (toDate) {
        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);
        filter['administration.receiptDate'].$lte = endDate;
      }
    }

    // Generic search across multiple fields
    if (search) {
      filter.$or = [
        { caseId: { $regex: search, $options: 'i' } },
        { 'drug.tradeName': { $regex: search, $options: 'i' } },
        { 'reporter.name': { $regex: search, $options: 'i' } },
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
      total,
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
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check role-based permission
    if (!requirePermission(payload.role as any, 'canCreateCase')) {
      return NextResponse.json(
        { error: 'Insufficient permissions. You do not have access to create cases.' },
        { status: 403 }
      );
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
        receiptDate: data.administration?.receiptDate || data.receiptDate || new Date(),
        caseClassification: data.administration?.caseClassification || data.caseClassification || 'Spontaneous',
        reportType: data.administration?.reportType || 'Initial',
        primaryReporterType: data.administration?.primaryReporterType || data.primaryReporterType || 'Physician',
        countryOfOccurrence: data.administration?.countryOfOccurrence || data.countryOfOccurrence || 'USA',
        awarenessDate: data.administration?.awarenessDate || data.awarenessDate || new Date(),
        isPregnancyCase: data.administration?.isPregnancyCase || data.isPregnancyCase || false,
      },
      patient: {
        initials: data.patient?.initials || 'N/A',
        age: data.patient?.age || 0,
        sex: normalizePatientSex(data.patient?.sex),
        medicalHistory: data.patient?.medicalHistory || '',
      },
      reaction: {
        verbatimTerm: data.reaction?.verbatimTerm || 'Unknown',
        meddraPreferredTerm: data.reaction?.meddraPreferredTerm || 'Unknown',
        meddraCode: data.reaction?.meddraCode || 'UNKNOWN',
        meddraSoc: data.reaction?.meddraSoc || 'Unknown',
        outcome: data.reaction?.outcome || 'Unknown',
        seriousnessCriteria: normalizeSeriousnessCriteria(data.reaction?.seriousness),
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
        type: data.reporter?.type || 'Physician',
        name: data.reporter?.name || payload.userId,
        qualification: data.reporter?.qualification || 'Analyst',
        institution: data.reporter?.institution || '',
        city: data.reporter?.city || '',
        country: data.reporter?.country || 'USA',
        phone: data.reporter?.phone || '',
        email: data.reporter?.email || '',
        sourceChannel: data.reporter?.sourceChannel || '',
        sourceDocument: data.reporter?.sourceDocument || '',
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
      return NextResponse.json(savedCase, { status: 200 });
    }

    // MongoDB path
    const aeCase = new AECase(caseData);
    await aeCase.save();

    return NextResponse.json(aeCase, { status: 200 });
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
