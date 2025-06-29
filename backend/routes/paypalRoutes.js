const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController');
router.post('/', paypalController.pay);
module.exports = router;
