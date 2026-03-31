const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitor-controller');

router.post('/track', visitorController.trackVisitor);
router.get('/stats', visitorController.getStats);

module.exports = router;
