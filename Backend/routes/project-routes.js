const express = require("express");
const router = express.Router();

const {getProjectById , getAllProjects} = require('../controllers/Projects-controller');

// Get all projects
router.get("/viewall", getAllProjects);

// Get a project by ID
router.get("/viewone/:id", getProjectById);

module.exports = router;