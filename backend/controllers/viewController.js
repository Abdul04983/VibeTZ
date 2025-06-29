const View = require('../models/View');
const Post = require('../models/Post');
const Earning = require('../models/Earning');

const viewPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const viewerId = req.user?._id;

    const alreadyViewed = await View.findOne({ postId, viewerId });
    if (alreadyViewed) return res.status(200).json({ message: 'Already viewed' });

    await View.create({ postId, viewerId });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const earningRate = 0.001;
    const ownerId = post.userId;

    let earning = await Earning.findOne({ userId: ownerId });
    if (!earning) earning = new Earning({ userId: ownerId });

    earning.totalViews += 1;
    earning.earnings += earningRate;
    await earning.save();

    res.status(200).json({ message: 'View recorded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { viewPost };
