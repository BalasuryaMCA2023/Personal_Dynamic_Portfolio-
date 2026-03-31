// In Express.js (Backend)
const express = require('express');
const router = express.Router();
const {getAllAbout} = require('../controllers/about-controller')

// Get About Data (Preview)

router.get('/' , getAllAbout)

module.exports = router;
