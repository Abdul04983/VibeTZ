const express = require('express');
const router = express.Router();
const { getStatus } = require('../controllers/mvpController');

router.get('/status', getStatus);

module.exports = router;
