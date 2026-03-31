// routes/clientVisibilityRoutes.js
const express = require('express');
const router = express.Router();
const clientVisibilityController = require('../controllers/visibility-controller');

// Get all visible sections (for client)
router.get('/sections', clientVisibilityController.getVisibleSections);

// Get all visible nav items (for client)
router.get('/nav-items', clientVisibilityController.getVisibleNavItems);

module.exports = router;
