const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    visitTime: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
