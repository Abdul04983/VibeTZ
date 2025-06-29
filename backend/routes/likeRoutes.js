const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, likeController.toggleLike);

module.exports = router;
