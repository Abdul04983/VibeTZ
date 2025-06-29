const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Text and target language are required" });
    }

    // Hapa weka logic ya translation (kwa sasa fake response)
    const translatedText = `Translated(${targetLanguage}): ${text}`;

    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { translateText };
