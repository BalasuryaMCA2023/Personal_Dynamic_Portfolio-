const express = require('express');
const router = express.Router();
const {getAllExperiences} = require('../controllers/experience-controller');

router.get('/' , getAllExperiences)

module.exports = router