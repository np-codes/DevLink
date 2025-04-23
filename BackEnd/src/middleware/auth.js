const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config;
const User = require('../models/user');

const userAuth = async(req,res,next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Invalid Token - Try Logging In.");
        }

        const decodedData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await User.findById(decodedData._id);
        if (!user) {
            throw new Error (`User Was Not Found In Our Records.`);
        } else {
            req.user = user;
            next();
        }
    } catch(err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }; 
};

module.exports = { userAuth };