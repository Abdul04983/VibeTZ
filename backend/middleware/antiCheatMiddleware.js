const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/cheatAttempts.log');

function logCheatAttempt(info) {
  const logLine = \\ | User: \ | IP: \ | Reason: \\n\;
  fs.appendFile(logFilePath, logLine, err => {
    if (err) console.error('Failed to log cheat attempt:', err);
  });
}

module.exports = function (req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const userId = req.body.userId || req.query.userId || 'unknown';

  // Example check: block if header x-ai-flag is 'fake'
  if (req.headers['x-ai-flag'] === 'fake') {
    logCheatAttempt({ userId, ip, reason: 'Header x-ai-flag=fake detected' });
    return res.status(403).json({ message: 'Action rejected by AI Anti-Cheat system.' });
  }

  // Example heuristic: too many requests within short time from same IP (basic)
  // For real app, integrate Redis or DB to track counts - simplified here:
  // TODO: Add rate limiting or AI-based checks

  next();
};
