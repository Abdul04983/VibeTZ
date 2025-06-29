const mongoose = require('mongoose');
const earningSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
});
module.exports = mongoose.model('Earning', earningSchema);
