const express = require('express');
const router = express.Router();
const captionController = require('../controllers/captionController');
router.post('/generate', captionController.generateCaption);
module.exports = router;
