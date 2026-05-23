import { dbConnect } from '../lib/db';
import { User } from '../models/User';
import { AECase } from '../models/AECase';
import { SafetyReport } from '../models/SafetyReport';

const DEMO_USERS = [
  {
    name: 'Admin User',
    email: 'admin@argus.com',
    password: 'password123',
    role: 'admin',
    department: 'Safety',
  },
  {
    name: 'John Analyst',
    email: 'analyst@argus.com',
    password: 'password123',
    role: 'analyst',
    department: 'Safety',
  },
  {
    name: 'Sarah Safety Officer',
    email: 'safety@argus.com',
    password: 'password123',
    role: 'safety_officer',
    department: 'Safety',
  },
  {
    name: 'Mike Supervisor',
    email: 'supervisor@argus.com',
    password: 'password123',
    role: 'supervisor',
    department: 'Safety',
  },
  {
    name: 'Lisa Reviewer',
    email: 'reviewer@argus.com',
    password: 'password123',
    role: 'analyst',
    department: 'Medical Review',
  },
];

const DEMO_CASES = [
  {
    caseId: 'CASE-2024-0001',
    status: 'New',
    priority: 'High',
    administration: {
      receiptDate: new Date('2024-05-01'),
      caseClassification: 'Spontaneous',
      reportType: 'Initial',
      primaryReporterType: 'Physician',
      countryOfOccurrence: 'USA',
      awarenessDate: new Date('2024-05-01'),
      isPregnancyCase: false,
    },
    patient: {
      initials: 'JD',
      age: 45,
      sex: 'M',
      weight: 85,
      height: 180,
      ethnicity: 'Caucasian',
      medicalHistory: 'Hypertension, diabetes',
      concomitantMeds: 'Metformin, Lisinopril',
    },
    reaction: {
      verbatimTerm: 'Severe liver injury',
      meddraPreferredTerm: 'Liver injury',
      meddraCode: 'PT100002',
      meddraSoc: 'Hepatobiliary disorders',
      onsetDate: new Date('2024-05-05'),
      endDate: new Date('2024-05-15'),
      outcome: 'Recovered',
      dateOfDeath: null,
      seriousnessCriteria: ['Hospitalization', 'Life-threatening'],
    },
    drug: {
      tradeName: 'Aspirin',
      activeSubstance: 'Acetylsalicylic acid',
      drugRole: 'Suspect',
      indication: 'Pain relief',
      dose: '500',
      doseUnit: 'mg',
      routeOfAdmin: 'Oral',
      frequency: 'Once daily',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-05-10'),
      lotNumber: 'LOT123456',
      dechallenge: 'Positive',
      rechallenge: 'Not performed',
      causality: 'Probable',
    },
    narrative: {
      caseNarrative: 'Patient presented with jaundice and elevated liver enzymes after taking Aspirin for pain relief.',
      labTests: 'ALT 450, AST 480, Bilirubin 3.2',
      additionalNotes: 'Patient recovered after discontinuation',
    },
    reporter: {
      title: 'Dr.',
      name: 'James Smith',
      qualification: 'Physician',
      institution: 'General Hospital',
      city: 'New York',
      country: 'USA',
      phone: '+1-555-0001',
      email: 'james.smith@hospital.com',
      reporterCausality: 'Probable',
    },
    assessment: {
      listedness: 'Listed',
      companyCausality: 'Probable',
      expeditedReportRequired: true,
      reportType: '15-day',
      reviewerComments: 'Consistent with known hepatic safety profile',
    },
    workflow: {
      currentStep: 'Intake',
      assignedTo: 'analyst@argus.com',
      lockedBy: null,
      lockedAt: null,
    },
    auditTrail: [
      {
        action: 'Case Created',
        performedBy: 'admin@argus.com',
        timestamp: new Date(),
        details: 'Case intake initiated',
      },
    ],
    createdBy: 'admin@argus.com',
    updatedBy: null,
  },
  {
    caseId: 'CASE-2024-0002',
    status: 'Open',
    priority: 'Medium',
    administration: {
      receiptDate: new Date('2024-05-02'),
      caseClassification: 'Literature',
      reportType: 'Follow-up',
      primaryReporterType: 'Pharmacist',
      countryOfOccurrence: 'Canada',
      awarenessDate: new Date('2024-05-02'),
      isPregnancyCase: false,
    },
    patient: {
      initials: 'AB',
      age: 32,
      sex: 'F',
      weight: 65,
      height: 165,
      ethnicity: 'African',
      medicalHistory: 'None',
      concomitantMeds: 'None',
    },
    reaction: {
      verbatimTerm: 'Rash and itching',
      meddraPreferredTerm: 'Rash',
      meddraCode: 'PT200001',
      meddraSoc: 'Skin and subcutaneous tissue disorders',
      onsetDate: new Date('2024-04-28'),
      endDate: new Date('2024-05-08'),
      outcome: 'Recovered',
      dateOfDeath: null,
      seriousnessCriteria: [],
    },
    drug: {
      tradeName: 'Ibuprofen',
      activeSubstance: 'Ibuprofen',
      drugRole: 'Suspect',
      indication: 'Fever',
      dose: '200',
      doseUnit: 'mg',
      routeOfAdmin: 'Oral',
      frequency: 'Every 6 hours',
      startDate: new Date('2024-04-20'),
      endDate: new Date('2024-04-30'),
      lotNumber: 'LOT789012',
      dechallenge: 'Positive',
      rechallenge: 'Not performed',
      causality: 'Possible',
    },
    narrative: {
      caseNarrative: 'Patient developed rash after taking Ibuprofen',
      labTests: 'None',
      additionalNotes: 'Resolved after stopping medication',
    },
    reporter: {
      title: 'Ms.',
      name: 'Marie Dubois',
      qualification: 'Pharmacist',
      institution: 'Community Pharmacy',
      city: 'Toronto',
      country: 'Canada',
      phone: '+1-416-0002',
      email: 'marie@pharmacy.ca',
      reporterCausality: 'Possible',
    },
    assessment: {
      listedness: 'Listed',
      companyCausality: 'Possible',
      expeditedReportRequired: false,
      reportType: 'Periodic',
      reviewerComments: 'Minor skin reaction, resolved spontaneously',
    },
    workflow: {
      currentStep: 'Data Entry',
      assignedTo: 'safety@argus.com',
      lockedBy: null,
      lockedAt: null,
    },
    auditTrail: [
      {
        action: 'Case Created',
        performedBy: 'analyst@argus.com',
        timestamp: new Date(),
        details: 'Case intake initiated',
      },
    ],
    createdBy: 'analyst@argus.com',
    updatedBy: 'safety@argus.com',
  },
];

const DEMO_REPORTS = [
  {
    reportId: 'RPT-20240501-001',
    reportType: '7-day',
    product: 'Aspirin',
    dueDate: new Date('2024-05-08'),
    submittedDate: null,
    status: 'Pending',
    totalCases: 1,
    seriousCases: 1,
    fatalCases: 0,
    summary: 'Serious hepatic adverse event reported',
    conclusions: 'Case meets criteria for expedited 7-day reporting',
    recommendations: 'Ongoing monitoring recommended',
    relatedCases: ['CASE-2024-0001'],
    createdBy: 'admin@argus.com',
  },
  {
    reportId: 'RPT-20240502-001',
    reportType: '15-day',
    product: 'Ibuprofen',
    dueDate: new Date('2024-05-17'),
    submittedDate: null,
    status: 'Pending',
    totalCases: 1,
    seriousCases: 0,
    fatalCases: 0,
    summary: 'Non-serious skin reaction reported',
    conclusions: 'Case submitted for periodic reporting',
    recommendations: 'No urgent action required',
    relatedCases: ['CASE-2024-0002'],
    createdBy: 'analyst@argus.com',
  },
];

async function seed() {
  try {
    await dbConnect();
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await AECase.deleteMany({});
    await SafetyReport.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create users
    const users = await User.insertMany(DEMO_USERS);
    console.log(`✓ Created ${users.length} demo users`);

    // Create cases
    const cases = await AECase.insertMany(DEMO_CASES);
    console.log(`✓ Created ${cases.length} demo cases`);

    // Create reports
    const reports = await SafetyReport.insertMany(DEMO_REPORTS);
    console.log(`✓ Created ${reports.length} demo reports`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nDemo Users:');
    DEMO_USERS.forEach((user) => {
      console.log(`  • ${user.email} / password123 (${user.role})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
