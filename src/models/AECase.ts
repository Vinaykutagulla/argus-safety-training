import mongoose, { Schema, Document } from 'mongoose';

export interface IAECase extends Document {
  caseId: string;
  status: 'New' | 'Open' | 'Under Review' | 'Closed' | 'Locked';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  administration: {
    receiptDate: Date;
    caseClassification: string;
    reportType: 'Initial' | 'Follow-up';
    primaryReporterType: string;
    countryOfOccurrence: string;
    awarenessDate: Date;
    isPregnancyCase: boolean;
  };
  patient: {
    initials: string;
    age: number;
    sex: 'M' | 'F' | 'Unknown';
    weight?: number;
    height?: number;
    ethnicity?: string;
    medicalHistory?: string;
    concomitantMeds?: string;
  };
  reaction: {
    verbatimTerm: string;
    meddraPreferredTerm: string;
    meddraCode: string;
    meddraSoc: string;
    onsetDate?: Date;
    endDate?: Date;
    outcome: string;
    dateOfDeath?: Date;
    seriousnessCriteria: string[];
  };
  drug: {
    tradeName: string;
    activeSubstance: string;
    drugRole: 'Suspect' | 'Concomitant' | 'Interacting';
    indication?: string;
    dose?: string;
    doseUnit?: string;
    routeOfAdmin?: string;
    frequency?: string;
    startDate?: Date;
    endDate?: Date;
    lotNumber?: string;
    dechallenge?: string;
    rechallenge?: string;
    causality?: string;
  };
  narrative: {
    caseNarrative: string;
    labTests?: string;
    additionalNotes?: string;
  };
  reporter: {
    title?: string;
    name: string;
    qualification: string;
    institution?: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
    reporterCausality?: string;
  };
  assessment: {
    listedness?: string;
    companyCausality?: string;
    expeditedReportRequired?: boolean;
    reportType?: string;
    reviewerComments?: string;
  };
  workflow: {
    currentStep: string;
    assignedTo?: string;
    lockedBy?: string;
    lockedAt?: Date;
  };
  auditTrail: Array<{
    action: string;
    performedBy: string;
    timestamp: Date;
    details?: string;
  }>;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const aeCaseSchema = new Schema<IAECase>(
  {
    caseId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['New', 'Open', 'Under Review', 'Closed', 'Locked'],
      default: 'New',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    administration: {
      receiptDate: { type: Date, required: true },
      caseClassification: { type: String, required: true },
      reportType: {
        type: String,
        enum: ['Initial', 'Follow-up'],
        required: true,
      },
      primaryReporterType: { type: String, required: true },
      countryOfOccurrence: { type: String, required: true },
      awarenessDate: { type: Date, required: true },
      isPregnancyCase: { type: Boolean, default: false },
    },
    patient: {
      initials: { type: String, required: true },
      age: { type: Number, required: true },
      sex: { type: String, enum: ['M', 'F', 'Unknown'], required: true },
      weight: { type: Number },
      height: { type: Number },
      ethnicity: { type: String },
      medicalHistory: { type: String },
      concomitantMeds: { type: String },
    },
    reaction: {
      verbatimTerm: { type: String, required: true },
      meddraPreferredTerm: { type: String, required: true },
      meddraCode: { type: String, required: true },
      meddraSoc: { type: String, required: true },
      onsetDate: { type: Date },
      endDate: { type: Date },
      outcome: { type: String, required: true },
      dateOfDeath: { type: Date },
      seriousnessCriteria: [{ type: String }],
    },
    drug: {
      tradeName: { type: String, required: true },
      activeSubstance: { type: String, required: true },
      drugRole: {
        type: String,
        enum: ['Suspect', 'Concomitant', 'Interacting'],
        required: true,
      },
      indication: { type: String },
      dose: { type: String },
      doseUnit: { type: String },
      routeOfAdmin: { type: String },
      frequency: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      lotNumber: { type: String },
      dechallenge: { type: String },
      rechallenge: { type: String },
      causality: { type: String },
    },
    narrative: {
      caseNarrative: { type: String, required: true },
      labTests: { type: String },
      additionalNotes: { type: String },
    },
    reporter: {
      title: { type: String },
      name: { type: String, required: true },
      qualification: { type: String, required: true },
      institution: { type: String },
      city: { type: String },
      country: { type: String },
      phone: { type: String },
      email: { type: String },
      reporterCausality: { type: String },
    },
    assessment: {
      listedness: { type: String },
      companyCausality: { type: String },
      expeditedReportRequired: { type: Boolean },
      reportType: { type: String },
      reviewerComments: { type: String },
    },
    workflow: {
      currentStep: { type: String, default: 'Intake' },
      assignedTo: { type: String },
      lockedBy: { type: String },
      lockedAt: { type: Date },
    },
    auditTrail: [
      {
        action: { type: String, required: true },
        performedBy: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        details: { type: String },
      },
    ],
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

aeCaseSchema.index({ caseId: 1 });
aeCaseSchema.index({ status: 1 });
aeCaseSchema.index({ 'administration.receiptDate': 1 });

export const AECase =
  mongoose.models.AECase || mongoose.model<IAECase>('AECase', aeCaseSchema);
