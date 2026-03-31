const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
    siteTitle: {
        type: String,
        default: 'My Portfolio'
    },
    siteDescription: {
        type: String,
        default: 'Welcome to my professional portfolio.'
    },
    contactEmail: {
        type: String,
        default: ''
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
