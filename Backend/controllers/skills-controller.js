const Skill = require('../models/skill.model');
const mongoose = require('mongoose');

module.exports = {

  getSkills: async (req, res) => {
    try {
      const skills = await Skill.find({ isActive: { $ne: false } });
      return res.json(skills);
    } catch (err) {
      console.error("Error in getSkills:", err);
      return res.status(500).json({ error: 'Unable to fetch skills' });
    }
  },

  getSkillById: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'Invalid Skill ID format' });
      }
      const skill = await Skill.findById(req.params.id);
      if (!skill) return res.status(404).json({ error: 'Skill not found' });
      return res.json(skill);
    } catch (err) {
      console.error("Error in getSkillById:", err);
      return res.status(500).json({ error: 'Unable to fetch skill' });
    }
  },


}