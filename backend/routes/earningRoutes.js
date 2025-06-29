const express = require('express');
const router = express.Router();
const { getMyEarnings } = require('../controllers/earningController');
const requireAuth = require('../middleware/requireAuth'); // Hakikisha hii ipo

router.get('/me', requireAuth, getMyEarnings);

module.exports = router;
