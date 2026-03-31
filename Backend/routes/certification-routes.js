const express = require('express');
const router = express.Router();
const {getAllCertifications,getCertificationById} = require('../controllers/certification-controller')

router.get('/', getAllCertifications);
router.get('/:id', getCertificationById);

module.exports = router;