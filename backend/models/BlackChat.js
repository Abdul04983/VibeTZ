const mongoose = require("mongoose");

const blackChatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  roomId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BlackChat", blackChatSchema);
