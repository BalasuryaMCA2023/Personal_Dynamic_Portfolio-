const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  fullName: String,
  role: [String],
  tagline: String,
  description: String,
  heroImageUrl: String,
  headingline: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
