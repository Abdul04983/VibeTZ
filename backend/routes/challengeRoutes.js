const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
router.post('/create', challengeController.createChallenge);
router.get('/leaderboard', challengeController.getLeaderboard);
module.exports = router;
