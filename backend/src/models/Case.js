const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  patientAge: Number,
  patientGender: { type: String, enum: ['M', 'F', 'Other'] },
  reporterName: String,
  reporterType: { 
    type: String, 
    enum: ['Healthcare Professional', 'Patient', 'Other']
  },
  dateOfOnset: Date,
  dateOfReport: { type: Date, default: Date.now },
  suspectedProducts: [{
    productName: String,
    dosage: String,
    route: String,
    indicatedFor: String,
    startDate: Date,
    endDate: Date
  }],
  seriousness: {
    isSerious: Boolean,
    seriousnessReasons: [String]
  },
  adverseEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdverseEvent'
  }],
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Assessed', 'Closed'],
    default: 'Draft'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    timestamp: { type: Date, default: Date.now }
  }],
  attachments: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', caseSchema);
