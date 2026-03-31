const mongoose = require('mongoose');

const visibilitySettingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['section', 'nav'],
    default: 'section'
  },
  section: {
    type: String,
    required: true,
    lowercase: true
  },
  visible: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

visibilitySettingSchema.index({ section: 1, type: 1 }, { unique: true });

const VisibilitySetting = mongoose.model('VisibilitySetting', visibilitySettingSchema);

module.exports = VisibilitySetting;