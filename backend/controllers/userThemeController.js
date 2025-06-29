const UserTheme = require('../models/UserTheme');

exports.getUserTheme = async (req, res) => {
  try {
    const theme = await UserTheme.findOne({ userId: req.params.userId });
    res.status(200).json(theme);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user theme' });
  }
};

exports.setUserTheme = async (req, res) => {
  try {
    const { userId, background, textColors } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    let theme = await UserTheme.findOne({ userId });
    if (theme) {
      theme.background = background || theme.background;
      theme.textColors = textColors || theme.textColors;
      await theme.save();
    } else {
      theme = await UserTheme.create({ userId, background, textColors });
    }

    res.status(200).json(theme);
  } catch (err) {
    res.status(500).json({ error: 'Failed to set user theme' });
  }
};
