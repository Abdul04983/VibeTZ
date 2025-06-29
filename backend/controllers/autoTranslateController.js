const translateText = (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) {
    return res.status(400).json({ error: "Text na targetLang ni lazima" });
  }

  // Hapa unaweza kuingiza logic ya auto translate API, kwa sasa tutarudisha response fake
  const translatedText = `${text} (translated to ${targetLang})`;

  res.json({ translatedText });
};
module.exports = { translateText };
