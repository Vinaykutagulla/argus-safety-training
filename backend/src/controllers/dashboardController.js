const Case = require('../models/Case');
const AdverseEvent = require('../models/AdverseEvent');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalCases = await Case.countDocuments();
    const casesByStatus = await Case.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const totalAdverseEvents = await AdverseEvent.countDocuments();
    const adverseEventsBySeverity = await AdverseEvent.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } }
    ]);

    const seriousCases = await Case.countDocuments({
      'seriousness.isSerious': true
    });

    res.json({
      totalCases,
      casesByStatus,
      totalAdverseEvents,
      adverseEventsBySeverity,
      seriousCases,
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cases timeline
exports.getCasesTimeline = async (req, res) => {
  try {
    const cases = await Case.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get adverse events report
exports.getAdverseEventsReport = async (req, res) => {
  try {
    const report = await AdverseEvent.aggregate([
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 },
          outcomes: { $push: '$outcome' }
        }
      }
    ]);

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
