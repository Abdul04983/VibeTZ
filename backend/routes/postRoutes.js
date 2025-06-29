const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, deletePost } = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createPost);
router.get('/', verifyToken, getAllPosts);
router.get('/:id', verifyToken, getPostById);
router.delete('/:id', verifyToken, deletePost);

module.exports = router;
