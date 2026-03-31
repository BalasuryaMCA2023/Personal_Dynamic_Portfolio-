const mongoose = require ('mongoose');
const dotenv = require ('dotenv');

dotenv.config(); // Load environment variables


const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://balasuryasurya03:balasuryasurya03Portfolio@my-portfolio.6xzum4d.mongodb.net/my_portfolio'

const connectDB = async () => {
  try {
    await mongoose.connect( MONGO_URI);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
