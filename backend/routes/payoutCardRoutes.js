const express = require('express');
const router = express.Router();
const { requestCardPayout } = require('../controllers/payoutCardController');
const requireAuth = require('../middleware/requireAuth');

router.post('/request', requireAuth, requestCardPayout);

module.exports = router;
