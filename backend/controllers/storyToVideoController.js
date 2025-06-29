const axios = require('axios');

exports.generateStoryVideo = async (req, res) => {
  try {
    const { story } = req.body;
    if (!story) return res.status(400).json({ error: 'Story is required' });

    // Example placeholder AI logic
    const response = await axios.post('https://api-internal-ai.fake/video', { text: story });
    return res.status(200).json({ videoUrl: response.data.videoUrl || 'https://sample-vibe/video.mp4' });
  } catch (err) {
    res.status(500).json({ error: 'Video generation failed', details: err.message });
  }
};
