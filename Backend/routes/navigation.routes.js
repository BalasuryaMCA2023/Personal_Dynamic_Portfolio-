const express = require('express');
const router = express.Router();
const navigationController = require('../controllers/navigation.controller');

router.get('/main', navigationController.getNavigation);

module.exports = router;
