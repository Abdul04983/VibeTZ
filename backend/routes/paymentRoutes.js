const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/airtel', paymentController.airtelPayment);
router.post('/mpesa', paymentController.mpesaPayment);
router.post('/tigo', paymentController.tigoPayment);

module.exports = router;
