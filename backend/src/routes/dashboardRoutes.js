const express = require('express');
const {
  getDashboardStats,
  getCasesTimeline,
  getAdverseEventsReport
} = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', auth, getDashboardStats);
router.get('/timeline', auth, getCasesTimeline);
router.get('/adverse-events-report', auth, getAdverseEventsReport);

module.exports = router;
