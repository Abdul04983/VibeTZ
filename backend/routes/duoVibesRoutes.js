const express = require('express');
const router = express.Router();
const duoVibesController = require('../controllers/duoVibesController');

router.post('/create', duoVibesController.createDuoVibe);

module.exports = router;
