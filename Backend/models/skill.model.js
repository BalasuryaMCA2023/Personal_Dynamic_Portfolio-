const mongoose = require ("mongoose");

const skillSchema = new mongoose.Schema({
    name: String,
    category: String, // frontend, backend, tools, etc.
    level: String, // Beginner, Intermediate, Advanced
    isActive: {
      type: Boolean,
      default: true,
    }
  });

 const Skill = mongoose.model("Skills", skillSchema);
  
  module.exports = Skill