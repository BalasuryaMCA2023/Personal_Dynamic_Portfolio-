const express = require('express');
const router = express.Router();
const { getGithubCommits } = require('../controllers/github-controller');

// GET /github/total-commits
router.get('/total-commits', getGithubCommits);

module.exports = router;
