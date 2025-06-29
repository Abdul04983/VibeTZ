const User = require('../models/userModel');

const getMyEarnings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('followers').populate('following');

    const isViewerEligible = user.following.length >= 1000;
    const isCreatorEligible = user.followers.length >= 1000;

    if (!isViewerEligible && !isCreatorEligible) {
      return res.status(403).json({ message: 'Huna vigezo vya kupokea kipato bado.' });
    }

    const earnings = {
      daily: isViewerEligible ? 500 : 0 + isCreatorEligible ? 1000 : 0,
      weekly: isViewerEligible ? 3500 : 0 + isCreatorEligible ? 7000 : 0,
      monthly: isViewerEligible ? 15000 : 0 + isCreatorEligible ? 30000 : 0,
    };

    res.json({ eligible: true, earnings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getMyEarnings };
