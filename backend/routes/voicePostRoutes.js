const express = require("express");
const router = express.Router();
const { textToSpeech } = require("../controllers/voicePostController");

router.post("/", textToSpeech);

module.exports = router;
