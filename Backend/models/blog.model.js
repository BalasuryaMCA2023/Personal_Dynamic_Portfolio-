const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String, // Rich HTML content
    required: true,
  },
  coverImage: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: 'Admin',
  },
  categories: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  views: {
    type: Number,
    default: 0
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: String,
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
