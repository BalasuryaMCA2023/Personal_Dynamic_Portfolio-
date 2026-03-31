const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address']
  },
  subject: {
    type: String,
   },
  content: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
