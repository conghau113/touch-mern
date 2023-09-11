const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const app = express();
const { authSocket, socketServer } = require('./socketServer');
const postsRoute = require('./routes/postsRoute');
const usersRoute = require('./routes/usersRoute');
const commentsRoute = require('./routes/commentsRoute');
const messagesRoute = require('./routes/messagesRoute');
var multer = require('multer');
const cookieParser = require('cookie-parser');
const corsOptions = {
  Credential: 'true',
};

dotenv.config();

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origins: ['http://localhost:4000'],
  },
});

io.use(authSocket);
io.on('connection', (socket) => socketServer(socket));
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('MongoDB connected');
});

httpServer.listen(process.env.PORT || 4000, () => {
  console.log(`Listening at port ${process.env.PORT || 4000}`);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/messages', messagesRoute);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
