const express = require('express');
const router = express.Router();
const textToSpeechController = require('../controllers/textToSpeechController');

router.post('/convert', textToSpeechController.convertTextToSpeech);

module.exports = router;
