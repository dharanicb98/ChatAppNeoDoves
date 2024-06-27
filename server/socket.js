
const Message = require('./schema/message');
const jwt = require('jsonwebtoken');

const io  = require('socket.io')(8000, {
    cors : {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (!token) return next(new Error('Unauthorized'));
  
//     jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
//       if (err) return next(new Error('Unauthorized'));
//       socket.user = decoded;
//       next();
//     });
// });

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Unauthorized'));

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return next(new Error('Unauthorized'));
        socket.user = decoded; // Attach decoded user information to socket
        next();
    });
});

// io.on('connection', (socket) => {
//     console.log('Socket connected:', socket.id);

//     socket.on('message', async (message) => {
//       const msg = JSON.parse(message);
//       const newMessage = new Message({ sender: socket.user.username, receiver: msg.receiver, message: msg.text });
//       await newMessage.save();
  
//       const messageData = {
//         sender: socket.user.username,
//         receiver: msg.receiver,
//         message: msg.text,
//         timestamp: new Date(),
//       };
  
//       io.emit('message', messageData);
//     });
  
//     socket.on('disconnect', () => {
//       console.log('Socket disconnected:', socket.id);
//     });
// })



// module.exports.io = io

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    console.log('socket.user.username', socket.user.username)
    socket.emit('authenticated', { username: socket.user.username });

    // Event listener for 'message' event
    socket.on('message', async (message) => {
        const msg = JSON.parse(message);
        // Create new message object and save to database
        const newMessage = new Message({
            sender: socket.user.username,
            receiver: msg.receiver,
            message: msg.text
        });
        await newMessage.save();

        // Prepare message data to emit to clients
        const messageData = {
            sender: socket.user.username,
            receiver: msg.receiver,
            message: msg.text,
            timestamp: new Date()
        };

        // Broadcast message to all connected clients
        io.emit('message', messageData);
    });

    // Event listener for 'disconnect' event
    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

module.exports.io = io;