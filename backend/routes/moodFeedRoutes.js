const express = require('express');
const router = express.Router();
const moodFeedController = require('../controllers/moodFeedController');

router.get('/', moodFeedController.getMoodFeed);
router.post('/update', moodFeedController.updateMood);

module.exports = router;
