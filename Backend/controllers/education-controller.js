const Education = require('../models/education.model');
const mongoose = require('mongoose');

module.exports = {


  // Get All
  getAllEducation: async (req, res) => {
    try {
      const educationList = await Education.find({ isActive: { $ne: false } }).sort({ order: 1 });
      res.status(200).json(educationList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch education data', error });
    }
  },

  // Get By ID
  getEducationById: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Invalid Education ID format' });
      }
      const education = await Education.findById(req.params.id);
      if (!education) return res.status(404).json({ message: 'Education not found' });
      res.status(200).json(education);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching education data', error });
    }
  },

}