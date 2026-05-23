const express = require('express');
const {
  createAdverseEvent,
  getAdverseEventsByCase,
  updateAdverseEvent,
  deleteAdverseEvent
} = require('../controllers/adverseEventController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, authorize('pharmacist', 'admin'), createAdverseEvent);
router.get('/case/:caseId', auth, getAdverseEventsByCase);
router.put('/:id', auth, authorize('pharmacist', 'admin'), updateAdverseEvent);
router.delete('/:id', auth, authorize('admin'), deleteAdverseEvent);

module.exports = router;
