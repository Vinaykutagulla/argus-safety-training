import mongoose, { Schema, Document } from 'mongoose';

// ===== ICH E2A COMPLIANT ADVERSE EVENT CASE MODEL =====
// Fully compliant with Oracle Argus Safety 8.x data structure

export interface IMedDRAEvent {
  _id?: string;
  verbatimTerm: string;
  onsetDate?: Date;
  stopDate?: Date;
  outcome: 'Fatal' | 'Recovered' | 'Recovering' | 'Not Recovered' | 'Unknown' | 'Not Applicable';
  seriousnessCriteria: ('Death' | 'Life-threatening' | 'Hospitalized' | 'Disability' | 'Congenital' | 'Other')[];
  
  // MedDRA Coding
  meddraSOC?: string;          // System Organ Class
  meddraHLGT?: string;         // High Level Group Term
  meddraHLT?: string;          // High Level Term
  meddraPT: string;            // Preferred Term (REQUIRED)
  meddraLLT?: string;          // Lowest Level Term
  meddraCode?: string;         // MedDRA Code
  
  // Listedness
  listedCompany?: 'Listed' | 'Not Listed' | 'Unknown';
  listednessReference?: string; // e.g., "CCDS v3.2"
  
  // WHO-UMC Causality Assessment
  timeRelationshipPlausible?: boolean;
  dechallenge?: 'Positive' | 'Negative' | 'Unknown' | 'Not Applicable';
  rechallenge?: 'Positive' | 'Negative' | 'Unknown' | 'Not Applicable';
  alternativeExplanation?: boolean;
  whoCausality?: 'Certain' | 'Probable' | 'Possible' | 'Unlikely' | 'Conditional' | 'Unassessable';
}

export interface IProduct {
  _id?: string;
  tradeName: string;
  genericName: string;
  manufacturer?: string;
  role: 'Suspect' | 'Concomitant' | 'Interacting';
  
  // Dosing
  dose?: number;
  doseUnit?: 'mg' | 'mcg' | 'g' | 'IU' | 'mL' | 'other';
  frequency?: 'Daily' | 'Twice Daily' | 'Three Times Daily' | 'As Needed' | 'other';
  routeOfAdministration?: 'Oral' | 'IV' | 'IM' | 'Topical' | 'Inhalation' | 'Transdermal' | 'other';
  startDate?: Date;
  endDate?: Date;
  indication?: string;
  
  // Action Taken
  actionTaken?: 'Drug Withdrawn' | 'Dose Reduced' | 'Dose Increased' | 'Dose Not Changed' | 'Unknown' | 'Not Applicable';
  rechallenge?: 'Positive' | 'Negative' | 'Unknown' | 'Not Applicable';
  dechallenge?: 'Positive' | 'Negative' | 'Unknown' | 'Not Applicable';
  
  // Causality
  companyCausality?: 'Certain' | 'Probable' | 'Possible' | 'Unlikely' | 'Conditional' | 'Unassessable';
  whoCausality?: 'Certain' | 'Probable' | 'Possible' | 'Unlikely' | 'Conditional' | 'Unassessable';
}

export interface IExpeditedReport {
  authority: 'FDA' | 'EMA' | 'CDSCO' | 'PMDA' | 'TGA' | 'other';
  reportType: '7-day' | '15-day' | 'Other';
  dueDate?: Date;
  clockStartDate?: Date;
  daysRemaining?: number;
  status: 'Not Due' | 'Due Soon' | 'Overdue' | 'Completed';
  submitted?: boolean;
  submissionDate?: Date;
  submittedBy?: string;
}

export interface IAuditEntry {
  revisionNumber: number;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  fieldChanged?: string;
  oldValue?: string;
  newValue?: string;
  comments?: string;
}

export interface IAECase extends Document {
  // Case Identification
  caseId: string;
  receiptDate: Date;
  awarenessDate?: Date;
  
  // Status & Workflow
  workflowState: 'New' | 'Open' | 'Data Entry' | 'Medical Review' | 'QC Review' | 'Locked' | 'Submitted';
  previousStates?: string[];
  assignedTo?: string;
  lockedBy?: string;
  lockedAt?: Date;
  
  // General Information
  reportType: 'Spontaneous' | 'Study' | 'Literature' | 'Other';
  seriousCase: boolean;
  seriousnessCriteria: ('Death' | 'Life-threatening' | 'Hospitalized' | 'Disability' | 'Congenital' | 'Other')[];
  
  // Patient Information
  patient: {
    initials: string;
    dateOfBirth?: Date;
    ageAtOnset?: number;
    ageUnit?: 'Years' | 'Months' | 'Weeks' | 'Days';
    gender: 'Male' | 'Female' | 'Unknown';
    weight?: number;
    weightUnit?: 'kg' | 'lbs';
    height?: number;
    heightUnit?: 'cm' | 'inches';
    ethnicity?: string;
    medicalHistory?: string;
    pregnancyInformation?: {
      isPregnant?: boolean;
      lastMenstrualPeriod?: Date;
      gestationalAge?: number;
    };
  };
  
  // Reporter Information
  reporter: {
    type: 'Physician' | 'Pharmacist' | 'Patient' | 'Other Healthcare Provider' | 'Non-Professional' | 'Clinical Investigator' | 'Other';
    name: string;
    qualification?: string;
    institution?: string;
    city?: string;
    country: string;
    phone?: string;
    email?: string;
    sourceChannel?: string;
    sourceDocument?: string;
  };
  
  // Geographic & Administrative
  countryOfIncidence: string;
  products: IProduct[];
  events: IMedDRAEvent[];
  
  // Case Narrative
  narrativeText?: string;
  laboratoryTests?: string;
  additionalInformation?: string;
  
  // Assessment & Routing
  assessment: {
    caseAssessmentNotes?: string;
    reviewerComments?: string;
    routingComments?: string;
  };
  
  // Expedited Reporting
  expeditedReports: IExpeditedReport[];
  
  // Study Information (if applicable)
  studyInformation?: {
    studyName?: string;
    protocolNumber?: string;
    studyType?: string;
  };
  
  // Audit Trail
  auditTrail: IAuditEntry[];
  revisionNumber: number;
  
  // Metadata
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
      type: {
        type: String,
        enum: ['Physician', 'Pharmacist', 'Patient', 'Other Healthcare Provider', 'Non-Professional', 'Clinical Investigator', 'Other'],
        default: 'Physician',
      },
      title: { type: String },
      name: { type: String, required: true },
      qualification: { type: String, required: true },
      institution: { type: String },
      city: { type: String },
      country: { type: String },
      phone: { type: String },
      email: { type: String },
      sourceChannel: { type: String },
      sourceDocument: { type: String },
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

aeCaseSchema.index({ status: 1 });
aeCaseSchema.index({ 'administration.receiptDate': 1 });

export const AECase =
  mongoose.models.AECase || mongoose.model<IAECase>('AECase', aeCaseSchema);
