const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume-controller');

router.get('/all', resumeController.getAllResumes);

module.exports = router;
