const SEO = require('../models/seo.model');

const getSEO = async (req, res) => {
    try {
        const { page } = req.params;
        const seo = await SEO.findOne({ page });
        if (!seo) {
            // Return 200 with null to avoid console errors for missing optional data
            return res.status(200).json(null);
        }
        res.status(200).json(seo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllSEO = async (req, res) => {
    try {
        const seoData = await SEO.find();
        res.status(200).json(seoData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSEO = async (req, res) => {
    try {
        const { page } = req.params;
        const { title, description, keywords } = req.body;

        const seo = await SEO.findOneAndUpdate(
            { page },
            { title, description, keywords },
            { new: true, upsert: true }
        );

        res.status(200).json(seo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSEO,
    getAllSEO,
    updateSEO
};
