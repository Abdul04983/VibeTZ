const express = require('express');
const router = express.Router();
const { processVisaPayment } = require('../controllers/visaController');

router.post('/visa', processVisaPayment);

module.exports = router;
