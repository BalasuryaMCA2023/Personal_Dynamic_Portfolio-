const Service = require('../models/service.model');

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ orderIndex: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};
