exports.generateTwinReply = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Logic ya AI Twin (kwa sasa dummy)
    const reply = `?? Twin wa ${userId}: Nimepokea ujumbe wako "${message}", na nipo tayari kujibu!`;

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Twin AI imeshindwa kujibu." });
  }
};
