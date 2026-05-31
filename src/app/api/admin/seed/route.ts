import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { AECase } from '@/models/AECase';

// Training case seed data for educational purposes
const trainingCases = [
  {
    caseId: 'ARG-001',
    status: 'Under Review',
    priority: 'Critical',
    administration: {
      receiptDate: new Date('2024-01-15'),
      caseClassification: 'Serious',
      reportType: 'Initial',
      primaryReporterType: 'Physician',
      countryOfOccurrence: 'India',
      awarenessDate: new Date('2024-01-14'),
      isPregnancyCase: false,
    },
    reaction: {
      verbatimReaction: 'Acute myocardial infarction with sudden collapse and loss of consciousness',
      reactionOnsetDate: new Date('2024-01-14'),
      reactionStopDate: new Date('2024-01-15'),
      seriousnessReasons: ['Death'],
      seriousnessCriteria: ['Death'],
      outcome: 'Fatal',
      meddraSoc: 'Cardiac disorders',
      meddraHlgt: 'Cardiac failure and shock',
      meddraHlt: 'Acute myocardial infarctions',
      meddraPt: 'Myocardial infarction',
      meddraLlt: 'Myocardial infarction',
      meddraCode: '10028193',
    },
    patient: {
      patientInitials: 'RK',
      dateOfBirth: new Date('1965-05-20'),
      ageAtOnset: 58,
      ageUnit: 'Years',
      gender: 'Male',
      weight: 75,
      weightUnit: 'kg',
      height: 175,
      heightUnit: 'cm',
      medicalHistory: 'Hypertension, Type 2 DM for 8 years, Previous MI in 2019',
    },
    drug: {
      tradeName: 'Metformin 500mg Tablet',
      genericName: 'Metformin Hydrochloride',
      manufacturer: 'Cipla Ltd',
      productRole: 'Suspect',
      dose: 500,
      doseUnit: 'mg',
      frequency: 'BID',
      routeOfAdministration: 'Oral',
      startDate: new Date('2023-12-10'),
      endDate: new Date('2024-01-14'),
      indication: 'Type 2 Diabetes Mellitus',
      actionTaken: 'Discontinued',
    },
    reporter: {
      type: 'Physician',
      name: 'Dr. Sharma',
      country: 'India',
    },
    assessment: {
      caseAssessmentNotes: 'TRAINING CASE 1: Expedited 7-day serious case (fatal). Demonstrates death outcome, ICH E2A 7-day reporting requirement.',
      whoCausality: 'Probable',
    },
    expeditedReporting: [
      {
        authority: 'CDSCO',
        reportType: '7-day',
        dueDate: new Date('2024-01-22'),
        clockStartDate: new Date('2024-01-15'),
        status: 'Completed',
        submitted: true,
      },
      {
        authority: 'FDA',
        reportType: '15-day',
        dueDate: new Date('2024-01-30'),
        clockStartDate: new Date('2024-01-15'),
        status: 'Due Soon',
        submitted: false,
      },
    ],
    createdBy: 'admin@argus.com',
    auditTrail: [
      {
        revisionNumber: 1,
        timestamp: new Date('2024-01-15T09:15:00'),
        userId: 'USER001',
        userName: 'Dr. Sharma',
        action: 'Created',
        comments: 'Initial case entry created',
      },
    ],
    revisionNumber: 1,
  },
  {
    caseId: 'ARG-002',
    status: 'Closed',
    priority: 'Low',
    administration: {
      receiptDate: new Date('2024-01-16'),
      caseClassification: 'Non-Serious',
      reportType: 'Initial',
      primaryReporterType: 'Patient',
      countryOfOccurrence: 'USA',
      awarenessDate: new Date('2024-01-13'),
      isPregnancyCase: false,
    },
    reaction: {
      verbatimReaction: 'Itchy rash on arms and legs, resolved spontaneously',
      reactionOnsetDate: new Date('2024-01-13'),
      reactionStopDate: new Date('2024-01-15'),
      seriousnessReasons: [],
      seriousnessCriteria: [],
      outcome: 'Recovered',
      meddraSoc: 'Skin and subcutaneous tissue disorders',
      meddraHlgt: 'Eruptions and exanthems',
      meddraHlt: 'Rashes',
      meddraPt: 'Rash',
      meddraLlt: 'Rash NOS',
      meddraCode: '10037844',
    },
    patient: {
      patientInitials: 'JD',
      dateOfBirth: new Date('1972-08-15'),
      ageAtOnset: 51,
      ageUnit: 'Years',
      gender: 'Female',
      weight: 65,
      weightUnit: 'kg',
      height: 162,
      heightUnit: 'cm',
      medicalHistory: 'Hypertension, No previous GI issues',
    },
    drug: {
      tradeName: 'Aspirin 75mg Tablet',
      genericName: 'Acetylsalicylic Acid',
      manufacturer: 'Bayer',
      productRole: 'Suspect',
      dose: 75,
      doseUnit: 'mg',
      frequency: 'OD',
      routeOfAdministration: 'Oral',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-15'),
      indication: 'Cardiovascular protection',
      actionTaken: 'Dose reduced',
    },
    reporter: {
      type: 'Patient',
      name: 'J.D.',
      country: 'USA',
    },
    assessment: {
      caseAssessmentNotes: 'TRAINING CASE 2: Non-serious case (rash). No expedited reporting required. Demonstrates non-serious outcome.',
      whoCausality: 'Possible',
    },
    expeditedReporting: [],
    createdBy: 'admin@argus.com',
    auditTrail: [
      {
        revisionNumber: 1,
        timestamp: new Date('2024-01-16T08:00:00'),
        userId: 'USER002',
        userName: 'Safety Officer',
        action: 'Created',
        comments: 'Case entry',
      },
    ],
    revisionNumber: 1,
  },
  {
    caseId: 'ARG-003',
    status: 'Under Review',
    priority: 'High',
    administration: {
      receiptDate: new Date('2024-01-17'),
      caseClassification: 'Serious',
      reportType: 'Initial',
      primaryReporterType: 'Physician',
      countryOfOccurrence: 'UK',
      awarenessDate: new Date('2024-01-15'),
      isPregnancyCase: true,
    },
    reaction: {
      verbatimReaction: 'Exposed to ibuprofen during pregnancy. Outcome pending follow-up of fetal development.',
      reactionOnsetDate: new Date('2024-01-15'),
      reactionStopDate: null,
      seriousnessReasons: ['Congenital'],
      seriousnessCriteria: ['Congenital'],
      outcome: 'Not Recovered',
      meddraSoc: 'Pregnancy, puerperium and perinatal conditions',
      meddraHlgt: 'Pregnancy and neonatal topics (non-neoplastic)',
      meddraHlt: 'Pregnancy and neonatal topics',
      meddraPt: 'Exposure during pregnancy',
      meddraLlt: 'Drug exposure during pregnancy',
      meddraCode: '10017599',
    },
    patient: {
      patientInitials: 'SM',
      dateOfBirth: new Date('1990-06-22'),
      ageAtOnset: 33,
      ageUnit: 'Years',
      gender: 'Female',
      weight: 62,
      weightUnit: 'kg',
      height: 166,
      heightUnit: 'cm',
      medicalHistory: 'Pregnant (exposed during 1st trimester). No previous adverse outcomes.',
      pregnancyInformation: {
        isPregnant: true,
        lastMenstrualPeriod: new Date('2023-11-10'),
        gestationalAge: 9,
      },
    },
    drug: {
      tradeName: 'Ibuprofen 200mg Tablet',
      genericName: 'Ibuprofen',
      manufacturer: 'GSK',
      productRole: 'Suspect',
      dose: 200,
      doseUnit: 'mg',
      frequency: 'TDS',
      routeOfAdministration: 'Oral',
      startDate: new Date('2023-11-20'),
      endDate: new Date('2024-01-10'),
      indication: 'Pain relief',
      actionTaken: 'Discontinued',
    },
    reporter: {
      type: 'Physician',
      name: 'Dr. Jones',
      country: 'UK',
    },
    assessment: {
      caseAssessmentNotes: 'TRAINING CASE 3: Pregnancy exposure case. Serious (congenital criteria). Requires prospective follow-up and EMA reporting.',
      whoCausality: 'Probable',
    },
    expeditedReporting: [
      {
        authority: 'EMA',
        reportType: '15-day',
        dueDate: new Date('2024-02-01'),
        clockStartDate: new Date('2024-01-17'),
        status: 'Due Soon',
        submitted: false,
      },
    ],
    createdBy: 'admin@argus.com',
    auditTrail: [
      {
        revisionNumber: 1,
        timestamp: new Date('2024-01-17T10:00:00'),
        userId: 'USER003',
        userName: 'Dr. Jones',
        action: 'Created',
        comments: 'Pregnancy case entry',
      },
    ],
    revisionNumber: 1,
  },
];

export async function POST(req: NextRequest) {
  try {
    // Check for seed password from environment
    const seedPassword = req.headers.get('x-seed-password');
    if (seedPassword !== process.env.SEED_PASSWORD && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Clear existing cases (optional - remove in production)
    const clearExisting = req.nextUrl.searchParams.get('clear') === 'true';
    if (clearExisting) {
      await AECase.deleteMany({});
      console.log('Cleared existing cases');
    }

    // Insert training cases
    const result = await AECase.insertMany(trainingCases);

    return NextResponse.json(
      {
        success: true,
        message: `Seeded ${result.length} training cases`,
        cases: result.map((c: any) => c.caseId),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: String(error) },
      { status: 500 }
    );
  }
}
