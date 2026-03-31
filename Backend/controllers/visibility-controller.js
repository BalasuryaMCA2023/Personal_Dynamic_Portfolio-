// controllers/clientVisibilityController.js
const VisibilitySetting = require('../models/visibility.model');

// GET all visible sections for client (only visible = true)
exports.getVisibleSections = async (req, res) => {
  try {
    const sections = await VisibilitySetting.find({ type: 'section', visible: true });
    res.json(sections);
  } catch (err) {
    console.error('Error fetching visible sections:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET all visible nav items for client (only visible = true)
exports.getVisibleNavItems = async (req, res) => {
  try {
    const navItems = await VisibilitySetting.find({ type: 'nav', visible: true });
    res.json(navItems);
  } catch (err) {
    console.error('Error fetching visible nav items:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
