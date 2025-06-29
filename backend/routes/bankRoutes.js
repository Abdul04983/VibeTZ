const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');
router.post('/', bankController.pay);
module.exports = router;
