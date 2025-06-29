exports.getNotifications = (req, res) => {
  res.status(200).json({ message: 'Get all enhanced notifications' });
};

exports.markAsRead = (req, res) => {
  res.status(200).json({ message: 'Notification marked as read' });
};
