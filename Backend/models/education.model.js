const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['High School', 'Undergraduate', 'Graduate', 'Postgraduate'],
    },
    fieldOfStudy: {
        type: String,
    },
    collegeName: {
        type: String,
    },
    graduationYear: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    grade: {
        type: String,
    },
    description: {
        type: String,
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Education = mongoose.model('Education', EducationSchema);

module.exports = Education;
