const express = require('express');
const router = express.Router();

const userThemeController = require('../controllers/userThemeController');
const socialMiniGamesController = require('../controllers/socialMiniGamesController');
const postCollabController = require('../controllers/postCollabController');
const blackChatController = require('../controllers/blackChatController');
const smartFeedController = require('../controllers/smartFeedController');

// User Theme
router.get('/:userId', userThemeController.getUserTheme);
router.post('/', userThemeController.setUserTheme);

// Social Mini-Games
router.get('/games', socialMiniGamesController.listGames);
router.post('/games/play', socialMiniGamesController.playGame);

// Post Collaboration (DuoVibes)
router.post('/post-collab/create', postCollabController.createCollab);
router.get('/post-collab/:id', postCollabController.getCollab);

// Black Chat
router.post('/black-chat/start', blackChatController.startChat);
router.post('/black-chat/send', blackChatController.sendMessage);

// Smart Feed
router.get('/smart-feed/:userId', smartFeedController.getSmartFeed);

module.exports = router;
