const express = require('express');
const router = express.Router();
const airtelController = require('../controllers/airtelController');
router.post('/', airtelController.pay);
module.exports = router;
