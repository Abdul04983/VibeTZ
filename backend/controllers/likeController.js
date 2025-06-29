const Like = require('../models/Like');

exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      await existingLike.remove();
      return res.status(200).json({ message: 'Like removed' });
    }

    const like = new Like({ postId, userId });
    await like.save();
    res.status(201).json({ message: 'Like added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
