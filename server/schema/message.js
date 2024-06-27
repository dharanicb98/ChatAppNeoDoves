const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
}, {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
});

const MessageSchema = mongoose.model('messages', messageSchema );
module.exports = MessageSchema;