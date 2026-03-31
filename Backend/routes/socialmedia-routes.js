const express = require('express');
const router = express.Router();

const {getAllSocialMedia} = require('../controllers/socialMedia-controllor');

router.get('/', getAllSocialMedia);

module.exports = router;