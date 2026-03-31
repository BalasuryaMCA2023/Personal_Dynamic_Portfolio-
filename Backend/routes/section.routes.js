const express = require('express');
const router = express.Router();
const Section = require('../models/section.model');

// GET /sections — returns all visible sections sorted by order
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find({ isVisible: true }).sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    console.error('Error fetching sections:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
