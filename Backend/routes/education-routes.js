const express = require('express');
const router = express.Router();

const { getAllEducation,getEducationById,} = require('../controllers/education-controller')

router.get('/', getAllEducation);
router.get('/:id', getEducationById);

module.exports = router;