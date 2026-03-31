const Resume = require('../models/resume.model');

exports.getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ isActive: { $ne: false } });
        res.status(200).json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
