const Project = require('../models/projects.model');

module.exports ={

    // Get all projects
getAllProjects : async (req, res) => {
  try {
    const projects = await Project.find({ isActive: { $ne: false } }).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
},

// Get single project
getProjectById : async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project", error });
  }
},


}