const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const followRoutes = require('./routes/followRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const mpesaRoutes = require('./routes/mpesaRoutes');
const airtelRoutes = require('./routes/airtelRoutes');
const paypalRoutes = require('./routes/paypalRoutes');
const bankRoutes = require('./routes/bankRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/airtel', airtelRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/bank', bankRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
});

app.use('/api/user', userRoutes);

app.use('/api/posts', postRoutes);

app.use('/api/follow', followRoutes);

app.use('/api/comments', commentRoutes);

app.use('/api/likes', likeRoutes);

app.use('/api/notifications', notificationRoutes);


app.use('/api/smartfeed', smartFeedRoutes);


app.use('/api/smartfeed', smartFeedRoutes);

const duoVibesRoutes = require('./routes/duoVibesRoutes');

app.use('/api/duovibes', duoVibesRoutes);

const translateRoutes = require('./routes/translateRoutes');

app.use('/api/translate', translateRoutes);

const blackChatRoutes = require('./routes/blackChatRoutes');

app.use('/api/blackchat', blackChatRoutes);

const miniGamesRoutes = require('./routes/miniGamesRoutes');

app.use('/api/minigames', miniGamesRoutes);

const voicePostRoutes = require('./routes/voicePostRoutes');

app.use('/api/voicepost', voicePostRoutes);
