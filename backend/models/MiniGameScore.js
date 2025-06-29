const mongoose = require('mongoose');

const miniGameScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game: String,
  score: Number,
  playedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MiniGameScore', miniGameScoreSchema);
