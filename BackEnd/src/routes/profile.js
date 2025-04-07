const { userAuth } = require("../middleware/auth");
const {validateEditProfileData } =  require("../utils/validation");
const User = require("../models/user");

const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

// Profile API : Finding User By ID - .findbyId()
router.get("/profile/view", userAuth, async(req,res) => {
    try {
        const user = req.user;
        res.send(user); 
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    };
});

// Updating User By ID - .findByIdAndUpdate()
router.patch("/profile/edit", userAuth, async(req,res) => {
    const user = req.user;
    const userID = user._id;
    const data = req.body;
    try{
        validateEditProfileData(data)
        // Validating Skills Array
        if(data.skills){
            if(!Array.isArray(data.skills) || data.skills.some(skill => Array.isArray(skill))){
                throw new Error("Smart Move To Send Nested Array, But I Caught You.");
            }
            data.skills = data.skills.map(skill => skill.trim()).filter(skill => skill.length > 0);
        };

        // Updating Our Data
        const user = await User.findByIdAndUpdate(userID, data, {
            runValidators: true,
        });

        if(!user){// If Statement Is Unnecessary
            res.status(404).send(`User With ID Was not Found.`);
        } else { 
            res.send(`${user.firstName} Your Data Has Been Updated.`);
        }
    } catch(err) {
        res.status(400).send("hereeee Error Occured : " + err.message);
    }
});

router.patch("/profile/password", userAuth, async(req,res) => {
    try {
        const user = req.user
        const userEmailId = req.body.emailId;
        const newpassword = req.body.password;
        if(!userEmailId){
            throw new Error ("To Change Password Your Email Is Required.")
        } else {
            if(userEmailId.toLowerCase() !== user.emailId){
                throw new Error("That Email Doesn't Match Our Records.");
            };//Assuming That User Is logged in And Changing Password.
            const passwordHash = await bcrypt.hash(newpassword, 10);
            user.password = passwordHash;
            await user.save();
            res.send(`${user.firstName} Your Password Has Been Updated.`);
        }        
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    };
})
module.exports = router;