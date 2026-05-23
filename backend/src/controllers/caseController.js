const Case = require('../models/Case');
const { v4: uuidv4 } = require('uuid');

// Create a new case
exports.createCase = async (req, res) => {
  try {
    const { patientAge, patientGender, reporterName, reporterType, dateOfOnset, suspectedProducts } = req.body;
    
    const caseId = `CASE-${uuidv4().substring(0, 8).toUpperCase()}`;

    const newCase = new Case({
      caseId,
      patientId: `PAT-${uuidv4().substring(0, 8).toUpperCase()}`,
      patientAge,
      patientGender,
      reporterName,
      reporterType,
      dateOfOnset,
      suspectedProducts,
      createdBy: req.user.userId
    });

    await newCase.save();
    res.status(201).json({
      message: 'Case created successfully',
      case: newCase
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cases
exports.getCases = async (req, res) => {
  try {
    const { status, assignedTo, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    const cases = await Case.find(query)
      .populate('adverseEvents')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Case.countDocuments(query);

    res.json({
      cases,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get case by ID
exports.getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const caseData = await Case.findById(id)
      .populate('adverseEvents')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('comments.user', 'name email');

    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.json(caseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update case
exports.updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const caseData = await Case.findByIdAndUpdate(id, updates, { new: true })
      .populate('adverseEvents')
      .populate('assignedTo', 'name email');

    res.json({
      message: 'Case updated successfully',
      case: caseData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search cases
exports.searchCases = async (req, res) => {
  try {
    const { caseId, patientId, status, dateFrom, dateTo } = req.query;
    
    let query = {};
    if (caseId) query.caseId = { $regex: caseId, $options: 'i' };
    if (patientId) query.patientId = { $regex: patientId, $options: 'i' };
    if (status) query.status = status;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const cases = await Case.find(query)
      .populate('adverseEvents')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      count: cases.length,
      cases
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
