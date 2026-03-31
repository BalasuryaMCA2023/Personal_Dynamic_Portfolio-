const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  messagetext: {
    type: String,
    default: "",
  },

  icon: {
    type: String,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('SocialMedia', SocialMediaSchema);
