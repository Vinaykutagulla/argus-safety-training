const express = require('express');
const {
  createCase,
  getCases,
  getCaseById,
  updateCase,
  searchCases
} = require('../controllers/caseController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createCase);
router.get('/', auth, getCases);
router.get('/search', auth, searchCases);
router.get('/:id', auth, getCaseById);
router.put('/:id', auth, authorize('admin', 'pharmacist'), updateCase);

module.exports = router;
