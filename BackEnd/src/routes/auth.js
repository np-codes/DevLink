const { validateSignUpData } = require("../utils/validation");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

// Signup API
router.post("/signup", async(req,res) => {
    try {
        const {firstName, lastName, emailId, password} = req.body;
        validateSignUpData(req);

        const duplicateEmail = await User.findOne({emailId : emailId });
        if (duplicateEmail) {
            throw new Error("Nice Try Lol!! Get A New Email.");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,
        });
        await user.save();
        // Creating JWT In User Schema
        const token = await user.getJWT();
        // Token In Our Cookie
        res.cookie("token",token, { maxAge : 7 * 24 * 60 * 60 * 1000 });
        res.json({
            message: `Hii ${ firstName }, Sign Up Successfully.`,
            data: user
        });
    } catch (err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }    
});

// Sigin API
router.post("/signin", async(req,res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error(`${emailId} Is Invalid Email.`)
        }

        const user = await User.findOne({emailId : emailId });
        if (!user) {
            throw new Error("-- Invalid Credentials --");
        }

        await user.validatePassword(password);
        // Creating JWT In User Schema
        const token = await user.getJWT();
        // Token In Our Cookie
        res.cookie("token",token, { maxAge : 7 * 24 * 60 * 60 * 1000 });
        res.json({
            message: `Login Successful.. Welcome Back!! ${user.firstName}.`,
            data: user
        });
    } catch (err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }
});

// Logout API
router.post("/logout", userAuth, (req,res) => {
    try{
        const user = req.user;
        res.clearCookie('token');
        res.json({
            message: `Logout Successful.. See You Again ${user.firstName}.`
        })
    } catch (err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }
});

module.exports = router;