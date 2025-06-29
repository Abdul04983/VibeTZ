const mongoose = require('mongoose');
const earningsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['viewer', 'creator'], required: true },
  totalEarnings: { type: Number, default: 0 },
  totalViews: { type: Number, default: 0 },
  totalWatchTime: { type: Number, default: 0 },
  totalSubscribers: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Earnings', earningsSchema);
