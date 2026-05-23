const mongoose = require('mongoose');

const adverseEventSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case'
  },
  eventDescription: { type: String, required: true },
  eventDate: Date,
  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Severe', 'Life-threatening'],
    required: true
  },
  outcome: {
    type: String,
    enum: ['Recovered', 'Recovering', 'Not Recovered', 'Fatal', 'Unknown'],
    default: 'Unknown'
  },
  meddraCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedDRA'
  },
  causality: {
    assessment: {
      type: String,
      enum: ['Related', 'Probably Related', 'Possibly Related', 'Not Related', 'Unknown']
    },
    reasoning: String
  },
  labFindings: [String],
  concomitantMedications: [String],
  medicalHistory: [String],
  dechallenge: String,
  rechallenge: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdverseEvent', adverseEventSchema);
