import mongoose, { Schema, Document } from 'mongoose';

export interface IMedDRATerm extends Document {
  code: string;           // MedDRA code (e.g., "10037800")
  term: string;           // Preferred Term (PT)
  soc: string;            // System Organ Class
  hlgt?: string;          // High Level Group Term
  hlt?: string;           // High Level Term
  llt?: string;           // Lowest Level Term
  status: 'Active' | 'Inactive';
  level: 'SOC' | 'HLGT' | 'HLT' | 'PT' | 'LLT';
  createdAt: Date;
  updatedAt: Date;
}

const meddraTermSchema = new Schema<IMedDRATerm>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    term: {
      type: String,
      required: true,
      index: true,
    },
    soc: {
      type: String,
      required: true,
      index: true,
    },
    hlgt: {
      type: String,
      index: true,
    },
    hlt: {
      type: String,
      index: true,
    },
    llt: {
      type: String,
      index: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    level: {
      type: String,
      enum: ['SOC', 'HLGT', 'HLT', 'PT', 'LLT'],
      required: true,
    },
  },
  { timestamps: true }
);

// Create text index for search
meddraTermSchema.index({ term: 'text', soc: 'text', code: 'text' });

export const MedDRATerm =
  mongoose.models.MedDRATerm || mongoose.model<IMedDRATerm>('MedDRATerm', meddraTermSchema);
