const SocialMedia = require('../models/socialmedia.model');

module.exports={

    // Get all social media links

  getAllSocialMedia: async (req, res) => {
    try {
      const allLinks = await SocialMedia.find({ isActive: { $ne: false } }).sort({ order: 1 });
      res.status(200).json(allLinks);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch social links', error });
    }
  },

}