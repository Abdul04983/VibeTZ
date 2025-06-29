const mongoose = require('mongoose');
const themeSchema = new mongoose.Schema({
  userId: String,
  bg: String,
  hourlyTextColors: [String]
});
module.exports = mongoose.model('UserTheme', themeSchema);
