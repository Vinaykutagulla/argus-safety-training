const express = require('express');
const {
  searchMedDRA,
  getMedDRAByCode,
  getSOCs
} = require('../controllers/meddraController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/search', auth, searchMedDRA);
router.get('/code/:code', auth, getMedDRAByCode);
router.get('/socs/list', auth, getSOCs);

module.exports = router;
