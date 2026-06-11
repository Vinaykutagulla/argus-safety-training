import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { MedDRATerm } from '@/models/MedDRATerm';

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

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const level = searchParams.get('level') || '';
    const soc = searchParams.get('soc') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const filter: any = {
      status: 'Active',
      $or: [
        { term: { $regex: query, $options: 'i' } },
        { code: { $regex: query, $options: 'i' } },
      ],
    };

    if (level) filter.level = level;
    if (soc) filter.soc = soc;

    const terms = await MedDRATerm.find(filter)
      .limit(limit)
      .sort({ level: 1, term: 1 });

    return NextResponse.json({
      terms,
      count: terms.length,
    });
  } catch (error) {
    console.error('MedDRA search error:', error);
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

    // Only admin/supervisor can create/update MedDRA terms
    if (!['admin', 'supervisor'].includes(payload.role)) {
      return NextResponse.json(
        { error: 'Only administrators can manage MedDRA terms' },
        { status: 403 }
      );
    }

    await dbConnect();

    const data = await req.json();
    const term = new MedDRATerm(data);
    await term.save();

    return NextResponse.json(term, { status: 201 });
  } catch (error) {
    console.error('MedDRA create error:', error);
    return NextResponse.json(
      { error: 'Failed to create MedDRA term' },
      { status: 500 }
    );
  }
}
