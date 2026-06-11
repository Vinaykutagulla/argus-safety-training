import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { MedDRATerm } from '@/models/MedDRATerm';

// Sample MedDRA terms for testing
const sampleTerms = [
  // Cardiac Disorders
  { code: '10007541', term: 'Myocardial infarction', soc: 'Cardiac Disorders', hlgt: 'Ischaemic coronary artery disorders', hlt: 'Acute coronary syndrome', llt: 'MI', level: 'PT', status: 'Active' },
  { code: '10037800', term: 'Myocarditis', soc: 'Cardiac Disorders', hlgt: 'Myocarditis and pericarditis', hlt: 'Myocarditis', level: 'PT', status: 'Active' },
  { code: '10002451', term: 'Arrhythmia', soc: 'Cardiac Disorders', hlgt: 'Cardiac arrhythmias', hlt: 'Atrial fibrillation', level: 'PT', status: 'Active' },
  { code: '10000705', term: 'Angina pectoris', soc: 'Cardiac Disorders', hlgt: 'Ischaemic coronary artery disorders', hlt: 'Acute coronary syndrome', level: 'PT', status: 'Active' },

  // Nervous System Disorders
  { code: '10012378', term: 'Headache', soc: 'Nervous System Disorders', hlgt: 'Headaches', hlt: 'Headache NEC', level: 'PT', status: 'Active' },
  { code: '10000702', term: 'Anxiety', soc: 'Nervous System Disorders', hlgt: 'Mood and affect disorders', hlt: 'Anxiety', level: 'PT', status: 'Active' },
  { code: '10013573', term: 'Insomnia', soc: 'Nervous System Disorders', hlgt: 'Sleep disorders', hlt: 'Insomnia NEC', level: 'PT', status: 'Active' },

  // Gastrointestinal Disorders
  { code: '10000081', term: 'Abdominal pain', soc: 'Gastrointestinal Disorders', hlgt: 'Abdominal and gastrointestinal symptoms', hlt: 'Abdominal pain NEC', level: 'PT', status: 'Active' },
  { code: '10000088', term: 'Nausea', soc: 'Gastrointestinal Disorders', hlgt: 'Nausea and vomiting', hlt: 'Nausea', level: 'PT', status: 'Active' },
  { code: '10016766', term: 'Vomiting', soc: 'Gastrointestinal Disorders', hlgt: 'Nausea and vomiting', hlt: 'Vomiting', level: 'PT', status: 'Active' },
  { code: '10012727', term: 'Diarrhoea', soc: 'Gastrointestinal Disorders', hlgt: 'Diarrhoea', hlt: 'Diarrhoea NEC', level: 'PT', status: 'Active' },

  // Skin and Subcutaneous Tissue Disorders
  { code: '10018965', term: 'Rash', soc: 'Skin and Subcutaneous Tissue Disorders', hlgt: 'Rashes, eruptions and exanthems NEC', hlt: 'Rash NEC', level: 'PT', status: 'Active' },
  { code: '10003045', term: 'Pruritus', soc: 'Skin and Subcutaneous Tissue Disorders', hlgt: 'Pruritus', hlt: 'Itching', level: 'PT', status: 'Active' },
  { code: '10000246', term: 'Anaphylaxis', soc: 'Immune System Disorders', hlgt: 'Allergic conditions', hlt: 'Anaphylactic reaction', level: 'PT', status: 'Active' },

  // Blood and Lymphatic System Disorders
  { code: '10000479', term: 'Anaemia', soc: 'Blood and Lymphatic System Disorders', hlgt: 'Anaemias', hlt: 'Anaemia NEC', level: 'PT', status: 'Active' },
  { code: '10049563', term: 'Thrombocytopenia', soc: 'Blood and Lymphatic System Disorders', hlgt: 'Platelet disorders', hlt: 'Thrombocytopenia', level: 'PT', status: 'Active' },
  { code: '10001273', term: 'Leukopenia', soc: 'Blood and Lymphatic System Disorders', hlgt: 'White blood cell disorders', hlt: 'Leukopenia', level: 'PT', status: 'Active' },

  // Musculoskeletal and Connective Tissue Disorders
  { code: '10027807', term: 'Myositis', soc: 'Musculoskeletal and Connective Tissue Disorders', hlgt: 'Muscle disorders', hlt: 'Myositis', level: 'PT', status: 'Active' },
  { code: '10003234', term: 'Arthralgia', soc: 'Musculoskeletal and Connective Tissue Disorders', hlgt: 'Joint disorders', hlt: 'Joint pain', level: 'PT', status: 'Active' },

  // Renal and Urinary Disorders
  { code: '10038935', term: 'Acute kidney injury', soc: 'Renal and Urinary Disorders', hlgt: 'Renal failure', hlt: 'Acute kidney injury', level: 'PT', status: 'Active' },
  { code: '10008788', term: 'Dysuria', soc: 'Renal and Urinary Disorders', hlgt: 'Urination abnormalities', hlt: 'Painful urination', level: 'PT', status: 'Active' },

  // Respiratory, Thoracic and Mediastinal Disorders
  { code: '10005046', term: 'Cough', soc: 'Respiratory, Thoracic and Mediastinal Disorders', hlgt: 'Respiratory tract signs and symptoms', hlt: 'Cough', level: 'PT', status: 'Active' },
  { code: '10002205', term: 'Asthma', soc: 'Respiratory, Thoracic and Mediastinal Disorders', hlgt: 'Asthma', hlt: 'Asthma', level: 'PT', status: 'Active' },
  { code: '10028897', term: 'Dyspnea', soc: 'Respiratory, Thoracic and Mediastinal Disorders', hlgt: 'Respiratory tract signs and symptoms', hlt: 'Shortness of breath', level: 'PT', status: 'Active' },
];

export async function POST(req: NextRequest) {
  try {
    const seedPassword = req.headers.get('x-seed-password');
    if (seedPassword !== process.env.SEED_PASSWORD && process.env.NODE_ENV === 'production') {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    await dbConnect();

    const clearExisting = req.nextUrl.searchParams.get('clear') === 'true';
    if (clearExisting) {
      await MedDRATerm.deleteMany({});
      console.log('Cleared existing MedDRA terms');
    }

    // Check if terms already exist
    const existingTerms = await MedDRATerm.countDocuments({});
    if (existingTerms > 0 && !clearExisting) {
      return NextResponse.json(
        {
          success: false,
          message: 'MedDRA terms already exist. Use ?clear=true to reset',
          count: existingTerms,
        },
        { status: 409 }
      );
    }

    // Insert sample terms
    const createdTerms = await MedDRATerm.insertMany(sampleTerms);

    return NextResponse.json(
      {
        success: true,
        message: `Seeded ${createdTerms.length} MedDRA terms`,
        count: createdTerms.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed MedDRA error:', error);
    return NextResponse.json(
      {
        error: 'Failed to seed MedDRA terms',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
