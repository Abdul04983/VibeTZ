const Post = require('../models/Post');

// Create new post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      user: req.user.id,
      caption: req.body.caption,
      image: req.body.image
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getSmartFeed = async (req, res) => {
  try {
    // Example: sort posts by likes count desc and createdAt desc
    const posts = await Post.find()
      .sort({ likesCount: -1, createdAt: -1 })
      .limit(50);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get smart feed' });
  }
};
