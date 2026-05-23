const MedDRA = require('../models/MedDRA');

// Search MedDRA codes
exports.searchMedDRA = async (req, res) => {
  try {
    const { term, code, soc } = req.query;
    
    let query = {};
    if (term) query.$or = [
      { preferredTerm: { $regex: term, $options: 'i' } },
      { lowLevelTerm: { $regex: term, $options: 'i' } }
    ];
    if (code) query.meddraCode = { $regex: code, $options: 'i' };
    if (soc) query.systemOrganClass = { $regex: soc, $options: 'i' };

    const results = await MedDRA.find(query).limit(50);

    res.json({
      count: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get MedDRA by code
exports.getMedDRAByCode = async (req, res) => {
  try {
    const { code } = req.params;
    
    const meddra = await MedDRA.findOne({ meddraCode: code });
    
    if (!meddra) {
      return res.status(404).json({ message: 'MedDRA code not found' });
    }

    res.json(meddra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all SOCs (System Organ Classes)
exports.getSOCs = async (req, res) => {
  try {
    const socs = await MedDRA.distinct('systemOrganClass');
    res.json(socs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
