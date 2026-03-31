const express = require('express');
const router = express.Router();
const { getSEO, getAllSEO, updateSEO } = require('../controllers/seo-controller');

router.get('/:page', getSEO);
router.get('/', getAllSEO);
router.put('/:page', updateSEO);

module.exports = router;
