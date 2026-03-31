const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  content: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: String,
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
