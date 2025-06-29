const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesaController');
router.post('/', mpesaController.pay);
module.exports = router;
