const textToSpeech = async (req, res) => {
  try {
    // Hapa ongeza logic ya ku-convert text kwenda speech (dummy response sasa)
    res.status(200).json({ audioUrl: "https://dummy-audio-url.com/audio.mp3" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { textToSpeech };
