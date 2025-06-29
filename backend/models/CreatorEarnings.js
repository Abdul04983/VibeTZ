const mongoose = require('mongoose');

const CreatorEarningsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  earnings: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('CreatorEarnings', CreatorEarningsSchema);
