const DuoVibe = require("../models/DuoVibe");

// Create a new DuoVibe post
exports.createDuoVibe = async (req, res) => {
  try {
    const { userId1, userId2, postContent, mediaUrls } = req.body;
    // Simple validation
    if (!userId1 || !userId2 || !postContent) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const newDuoVibe = new DuoVibe({
      collaborators: [userId1, userId2],
      content: postContent,
      media: mediaUrls || [],
      createdAt: new Date(),
    });

    await newDuoVibe.save();
    res.status(201).json(newDuoVibe);
  } catch (error) {
    res.status(500).json({ message: "Error creating DuoVibe post", error });
  }
};

// Get all DuoVibes for a user
exports.getUserDuoVibes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const duoVibes = await DuoVibe.find({ collaborators: userId });
    res.status(200).json(duoVibes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching DuoVibes", error });
  }
};
