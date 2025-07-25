const AiTwinChat = require('../models/AiTwinChat');
const { openai } = require('../utils/openaiClient');

exports.chatWithAiTwin = async (req, res) => {
  try {
    const userId = req.user.id;
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: 'Message is required' });

    let chat = await AiTwinChat.findOne({ userId });
    if (!chat) {
      chat = new AiTwinChat({ userId, messages: [] });
    }

    chat.messages.push({ sender: 'user', text: userMessage });

    const promptMessages = chat.messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: promptMessages,
      max_tokens: 150,
    });

    const aiReply = response.choices[0].message.content;

    chat.messages.push({ sender: 'ai', text: aiReply });

    await chat.save();

    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

