// In Express.js (Backend)
const Home = require('../models/home.model');  // Assuming Home model exists

module.exports ={

  getHome: async (req, res) => {
  try {
    const data = await Home.findOne(); // returns a single object

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Home information not found' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching Home' });
  }
},


}