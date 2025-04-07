const { validateSignUpData } = require("../utils/validation");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

//Signup API
router.post("/signup", async(req,res) => {
    try {
        const {firstName, lastName, emailId, password} = req.body;
        validateSignUpData(req);
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,
        });
        await user.save();
        res.send("New User Added Successfully.");
    } catch (err) {
        res.status(400).send("Error Occured : " + err.message);
    }    
});

// Login API
router.post("/login", async(req,res) => {
    try {
        const { emailId, password } = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error(`${emailId} Is Invalid Email.`)
        }
        const user = await User.findOne({emailId : emailId });
        if(!user){
            throw new Error("Invalid Credentials - Dont Give Up, Try Another Again.");
        }
        await user.validatePassword(password);
        // Creating JWT In User Schema
        const token = await user.getJWT();
        // Token In Our Cookie
        res.cookie("token",token, { maxAge : 7 * 24 * 60 * 60 * 1000 });
        res.send(`Login Successful.. Welcome !! ${user.firstName}.`);
    } catch (err) {
        res.status(400).send("Error Occured : " + err.message);
    }
});

router.post("/logout", userAuth, (req,res) => {
    try{
        const user = req.user;
        res.clearCookie('token');
        res.send(`Logout Successful..See You Again ${user.firstName}.`);
    } catch (err) {
        res.status(400).send("here Error Occured : " + err.message);
    }
});

module.exports = router;