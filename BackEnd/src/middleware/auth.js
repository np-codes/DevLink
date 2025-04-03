const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config;
const User = require('../models/user');

const userAuth = async(req,res,next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            throw new Error ("Invalid Token - Try Logging In.");
        }
        const decodedData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await User.findById(decodedData._id);
        if(!user){
            res.status(404).send(`User With ID: ${user._id} Was Not Found.`);
        } else {
            // Adding user To Our Request Object
            req.user = user;
            next();
        }
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    }; 
};

module.exports = { userAuth };