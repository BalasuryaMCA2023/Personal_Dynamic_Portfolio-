const About =require('../models/abouts.model')

module.exports={

    // Get All About Entries
    getAllAbout: async (req, res) => {
        try {
            const aboutData = await About.find();
            res.status(200).json(aboutData);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch About data', error });
        }
    },

}