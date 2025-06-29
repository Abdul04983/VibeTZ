const Chat = require('../models/Chat');
const Message = require('../models/Message');

// Example: Get all chats for a user
exports.getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.params.userId });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Imeshindikana kupata mazungumzo' });
  }
};

// Example: Send message
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = new Message({ chatId, senderId, text, createdAt: new Date() });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Imeshindikana kutuma ujumbe' });
  }
};
