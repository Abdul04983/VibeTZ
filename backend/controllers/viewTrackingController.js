const ViewTracking = require('../models/viewTrackingModel');
const Earnings = require('../models/Earnings'); // assume model from earlier

exports.logView = async (req, res) => {
  try {
    const { userId, videoId, watchTime } = req.body;
    const record = await ViewTracking.create({ userId, videoId, watchTime });
    // update viewer earnings
    const rate = 1; // 1 point per second
    const viewerEarning = await Earnings.findOne({ userId, role: 'viewer' });
    const points = watchTime * rate;
    if (viewerEarning) {
      viewerEarning.totalEarnings += points;
      viewerEarning.totalWatchTime += watchTime;
      await viewerEarning.save();
    } else {
      await Earnings.create({
        userId,
        role: 'viewer',
        totalEarnings: points,
        totalWatchTime: watchTime
      });
    }
    res.status(200).json({ success: true, record, points });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getViewerEarnings = async (req, res) => {
  try {
    const { userId } = req.params;
    const earnings = await Earnings.findOne({ userId, role: 'viewer' });
    res.status(200).json({ success: true, earnings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
