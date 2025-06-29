const BlackChat = require("../models/BlackChat");

const sendBlackChatMessage = async (req, res) => {
  try {
    const { message, roomId } = req.body;
    const newMessage = new BlackChat({ message, roomId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Imeshindikana kutuma ujumbe" });
  }
};

const getBlackChatMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await BlackChat.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Imeshindikana kupata ujumbe" });
  }
};

module.exports = {
  sendBlackChatMessage,
  getBlackChatMessages,
};
