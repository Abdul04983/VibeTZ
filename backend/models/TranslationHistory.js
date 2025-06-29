const mongoose = require('mongoose');

const translationHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  originalText: String,
  translatedText: String,
  languageFrom: String,
  languageTo: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TranslationHistory', translationHistorySchema);
