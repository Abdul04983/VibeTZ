const express = require('express');
const router = express.Router();
const vibeChallengeController = require('../controllers/vibeChallengeController');

router.get('/', vibeChallengeController.getChallenges);
router.post('/create', vibeChallengeController.createChallenge);

module.exports = router;
