const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        default: 'balasuryasuryabs@gmail.com'
    },
    phone: {
        type: String,
        required: true,
        default: '+91 962906177'
    },
    address: {
        type: String,
        required: true,
        default: 'Tirupur, Tamilnadu, India'
    },
    availability: {
        type: String,
        enum: ['Open to Work', 'Busy', 'Holiday'],
        default: 'Open to Work'
    },
    whatsappNumber: {
        type: String,
        default: '9629606177'
    },
    whatsappMessage: {
        type: String,
        default: "Hi, I'm interested in working with you."
    }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
