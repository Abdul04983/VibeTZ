const fs = require("fs");
const path = require("path");

const convertTextToSpeech = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const fakeAudio = `Audio_of_${text}`;
    const filename = `voice_${Date.now()}.mp3`;

    const dir = path.join(__dirname, "..", "voices");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFileSync(path.join(dir, filename), fakeAudio);
    res.json({ audioUrl: `/voices/${filename}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to convert text" });
  }
};

module.exports = { convertTextToSpeech };
