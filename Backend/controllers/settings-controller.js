const SiteConfig = require('../models/siteConfig.model');

exports.getSettings = async (req, res) => {
    try {
        const config = await SiteConfig.findOne();
        if (!config) {
            return res.status(404).json({ message: 'Configuration not found' });
        }
        res.status(200).json(config);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
