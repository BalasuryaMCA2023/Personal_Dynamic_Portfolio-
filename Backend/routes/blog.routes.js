const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/', blogController.getAllPublishedBlogs);
router.get('/:slug', blogController.getBlogBySlug);

module.exports = router;
