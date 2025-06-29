const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const verifyToken = require('../middleware/verifyToken'); // assuming you have auth middleware

router.post('/request', verifyToken, payoutController.requestPayout);
router.get('/my-payouts', verifyToken, payoutController.getUserPayouts);

module.exports = router;
