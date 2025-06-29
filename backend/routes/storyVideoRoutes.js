const express = require('express');
const router = express.Router();
const storyVideoController = require('../controllers/storyVideoController');
router.post('/create', storyVideoController.createVideoFromStory);
module.exports = router;
