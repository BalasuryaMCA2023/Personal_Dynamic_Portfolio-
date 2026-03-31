const express = require('express');
const router = express.Router();

const {getSkillById , getSkills} = require('../controllers/skills-controller');

router.get('/all', getSkills);
router.get('/view/:id', getSkillById);

module.exports = router;