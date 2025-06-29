const mongoose = require('mongoose');

const viewTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  watchTime: { type: Number, default: 0 },      // seconds watched
  watchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ViewTracking', viewTrackingSchema);
