const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['Web', 'Mobile', 'Desktop', 'API', 'Digital Marketing', 'Ai Tools', 'Tools', 'Other'],
    default: 'Web',
  },
  techStack: {
    type: [String],
    default: [],
  },
  urlType: {
    type: String,
    enum: ['params', 'drive', 'other'],
    default: 'params',
  },
  Result: String,
  imageUrl: String,
  liveUrl: String,
  Url: String,
  featured: {
    type: Boolean,
    default: false,
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

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
