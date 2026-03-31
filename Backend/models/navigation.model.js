const mongoose = require('mongoose');

const navigationItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, default: 0 },
  isExternal: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true }
});

const navigationSchema = new mongoose.Schema({
  menuType: { type: String, default: 'main' },
  items: [navigationItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Navigation', navigationSchema);
