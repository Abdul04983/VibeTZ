const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');
router.post('/text-to-speech', voiceController.textToSpeech);
module.exports = router;
