exports.createVoicePost = async (req, res) => {
  const { text, audio } = req.body;
  try {
    console.log("📥 VoicePost received:", text, audio);
    return res.status(201).json({ success: true, message: "VoicePost created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error" });
  }
};
