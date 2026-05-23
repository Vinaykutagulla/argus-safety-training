const AdverseEvent = require('../models/AdverseEvent');
const Case = require('../models/Case');

// Create adverse event
exports.createAdverseEvent = async (req, res) => {
  try {
    const { caseId, eventDescription, eventDate, severity, outcome, meddraCode, causality } = req.body;

    const adverseEvent = new AdverseEvent({
      caseId,
      eventDescription,
      eventDate,
      severity,
      outcome,
      meddraCode,
      causality
    });

    await adverseEvent.save();

    // Add to case
    await Case.findByIdAndUpdate(caseId, {
      $push: { adverseEvents: adverseEvent._id }
    });

    res.status(201).json({
      message: 'Adverse event created successfully',
      adverseEvent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get adverse events by case
exports.getAdverseEventsByCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    
    const adverseEvents = await AdverseEvent.find({ caseId })
      .populate('meddraCode');

    res.json(adverseEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update adverse event
exports.updateAdverseEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const adverseEvent = await AdverseEvent.findByIdAndUpdate(id, updates, { new: true })
      .populate('meddraCode');

    res.json({
      message: 'Adverse event updated successfully',
      adverseEvent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete adverse event
exports.deleteAdverseEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await AdverseEvent.findByIdAndDelete(id);
    res.json({ message: 'Adverse event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
