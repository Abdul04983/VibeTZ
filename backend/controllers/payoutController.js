const Payout = require('../models/payoutModel');

// Request payout
exports.requestPayout = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const user = req.user._id;

    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const payout = new Payout({ user, amount, method });
    await payout.save();

    res.status(201).json({ message: 'Payout requested successfully', payout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payouts for a user
exports.getUserPayouts = async (req, res) => {
  try {
    const user = req.user._id;
    const payouts = await Payout.find({ user }).sort({ requestedAt: -1 });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
