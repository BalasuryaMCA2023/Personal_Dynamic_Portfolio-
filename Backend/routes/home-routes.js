const express = require('express');
const router = express.Router();
const {getHome} = require('../controllers/home-controller');

// Get Home Section
router.get('/', getHome);

module.exports = router; 