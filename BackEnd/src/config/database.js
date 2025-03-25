const mongoose = require("mongoose");
const env = require('dotenv');
env.config();

const connectDB = async() => {
    try{
        await mongoose.connect(
            process.env.MONGO_URL
        );
    } catch (err){
        console.error("Error in URL string.")
    } 
};

module.exports = connectDB ;

