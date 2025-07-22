const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  challengeType: { type: String, enum: ["video", "voice", "text"], required: true },
  startDate: Date,
  endDate: Date,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  submissions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    submissionUrl: String,
    score: Number,
    submittedAt: Date,
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Challenge", challengeSchema);
