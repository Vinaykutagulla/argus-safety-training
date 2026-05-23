import mongoose, { Schema, Document } from 'mongoose';

export interface ISafetyReport extends Document {
  reportId: string;
  reportType: 'PSUR' | 'DSUR' | 'PBRER' | 'PADER' | '7-day' | '15-day';
  product: string;
  dataLockPoint?: Date;
  periodStart?: Date;
  periodEnd?: Date;
  dueDate: Date;
  submittedDate?: Date;
  status: 'Pending' | 'Submitted' | 'Overdue';
  totalCases: number;
  seriousCases: number;
  fatalCases: number;
  summary?: string;
  conclusions?: string;
  recommendations?: string;
  relatedCases: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const safetyReportSchema = new Schema<ISafetyReport>(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
    },
    reportType: {
      type: String,
      enum: ['PSUR', 'DSUR', 'PBRER', 'PADER', '7-day', '15-day'],
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    dataLockPoint: {
      type: Date,
    },
    periodStart: {
      type: Date,
    },
    periodEnd: {
      type: Date,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    submittedDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Pending', 'Submitted', 'Overdue'],
      default: 'Pending',
    },
    totalCases: {
      type: Number,
      required: true,
      default: 0,
    },
    seriousCases: {
      type: Number,
      required: true,
      default: 0,
    },
    fatalCases: {
      type: Number,
      required: true,
      default: 0,
    },
    summary: {
      type: String,
    },
    conclusions: {
      type: String,
    },
    recommendations: {
      type: String,
    },
    relatedCases: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

safetyReportSchema.index({ reportId: 1 });
safetyReportSchema.index({ dueDate: 1 });

export const SafetyReport =
  mongoose.models.SafetyReport ||
  mongoose.model<ISafetyReport>('SafetyReport', safetyReportSchema);
