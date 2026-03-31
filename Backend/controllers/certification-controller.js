const Certification = require('../models/certification.model')

module.exports={

    // Get All
getAllCertifications: async (req, res) => {
  try {
    const certifications = await Certification.find({ isActive: { $ne: false } }).sort({ order: 1 });
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch certifications', error });
  }
},

// Get by ID
getCertificationById : async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certification', error });
  }
},


}