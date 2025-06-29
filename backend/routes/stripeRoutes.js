const express = require('express');
const router = express.Router();
const { handleStripePayment } = require('../controllers/stripeController');

router.post('/pay', handleStripePayment);

module.exports = router;
