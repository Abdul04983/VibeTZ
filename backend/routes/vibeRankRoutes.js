const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vibeRankController');
router.get('/:userId', ctrl.getUserRank);
module.exports = router;
