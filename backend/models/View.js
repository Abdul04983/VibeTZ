const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  viewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  viewedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('View', viewSchema);
