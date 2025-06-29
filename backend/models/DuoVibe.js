const mongoose = require("mongoose");

const duoVibeSchema = new mongoose.Schema({
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  content: { type: String, required: true },
  media: [{ type: String }], // URLs to images/videos
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DuoVibe", duoVibeSchema);
