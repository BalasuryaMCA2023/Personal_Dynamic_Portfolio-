// models/About.js

const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: { type: String },
  jobTitle: { type: String },
  description: { type: String },
  education: {
    degree: { type: String },
    institution: { type: String },
    graduationYear: { type: Number }
  },
  ImageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const About = mongoose.model('About-Us', AboutSchema);

module.exports = About;