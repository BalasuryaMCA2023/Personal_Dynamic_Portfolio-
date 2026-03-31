const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        unique: true, // e.g., 'home', 'about', 'projects', 'skills', 'experience', 'education', 'contact'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String, // Comma separated
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('SEO', seoSchema);
