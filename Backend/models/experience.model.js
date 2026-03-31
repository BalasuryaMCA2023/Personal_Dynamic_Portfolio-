const mongoose = require ("mongoose");

const experienceSchema = new mongoose.Schema({
    title: String,
    location: String,
    type : String, // full-time, part-time, internship, etc.
    company: String,
    duration: String,
    description: String,
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  });

 const Experience = mongoose.model("Experience", experienceSchema);
  
module.exports = Experience
  