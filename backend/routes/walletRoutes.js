const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/fund', walletController.fundWallet);
router.post('/transfer', walletController.transferFunds);
router.get('/:userId', walletController.getWalletBalance);

module.exports = router;
