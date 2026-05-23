const mongoose = require('mongoose');

const meddraSchema = new mongoose.Schema({
  meddraCode: { type: String, required: true, unique: true },
  preferredTerm: { type: String, required: true },
  lowLevelTerm: String,
  highLevelGroupingTerm: String,
  systemOrganClass: String,
  meddraVersion: String,
  description: String,
  seriousness: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedDRA', meddraSchema);
