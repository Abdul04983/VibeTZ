const User = require('../models/User');

exports.followUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    const current = await User.findById(req.user.id);

    if (!target || !current) return res.status(404).json({ error: 'User not found' });

    if (!target.followers.includes(req.user.id)) {
      target.followers.push(req.user.id);
      current.following.push(req.params.id);
      await target.save();
      await current.save();
    }

    res.json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    const current = await User.findById(req.user.id);

    if (!target || !current) return res.status(404).json({ error: 'User not found' });

    target.followers = target.followers.filter(uid => uid.toString() !== req.user.id);
    current.following = current.following.filter(uid => uid.toString() !== req.params.id);

    await target.save();
    await current.save();

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
