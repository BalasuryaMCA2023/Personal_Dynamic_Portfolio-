const Experience = require('../models/experience.model')

module.exports = {

 
 getAllExperiences : async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching experiences', error: err });
  }
}

}