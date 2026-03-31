const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'fullstack', 'marketing', 'general']
    },
    url: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
