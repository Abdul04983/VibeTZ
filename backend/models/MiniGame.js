const mongoose = require('mongoose');

const miniGameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, default: 'waiting' }, // waiting, ongoing, finished
  result: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MiniGame', miniGameSchema);
