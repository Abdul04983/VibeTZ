const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalViews: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 }
});

module.exports = mongoose.model('Earning', earningSchema);
