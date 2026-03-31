const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    issuer: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    expirationDate: {
        type: Date,
        default: "AndTill"
    },
    credentialID: {
        type: String,
    },
    credentialURL: {
        type: String,
    },
    urlType: {
        type: String,
        enum: ['params', 'drive', 'other'],
        default: 'other',
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model('Certification', CertificationSchema);
