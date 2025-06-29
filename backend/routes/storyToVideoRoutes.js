const express = require('express');
const router = express.Router();
const { generateStoryVideo } = require('../controllers/storyToVideoController');

router.post('/generate', generateStoryVideo);

module.exports = router;
