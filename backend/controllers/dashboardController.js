
const Payout = require("../models/payoutModel");
const Earning = require("../models/earningModel");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Jumla ya earnings user amepata
    const totalEarnings = await Earning.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Jumla ya payouts user ametoa
    const totalPayouts = await Payout.aggregate([
      { $match: { user: userId, status: "approved" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const earnings = totalEarnings[0] ? totalEarnings[0].total : 0;
    const payouts = totalPayouts[0] ? totalPayouts[0].total : 0;
    const balance = earnings - payouts;

    res.json({
      totalEarnings: earnings,
      totalPayouts: payouts,
      balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getDashboard };

