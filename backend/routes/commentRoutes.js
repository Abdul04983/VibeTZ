const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);

module.exports = router;
