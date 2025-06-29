const express = require('express');
const router = express.Router();
const { getSmartFeed } = require('../controllers/postController');

router.get('/smart-feed', getSmartFeed);

module.exports = router;
