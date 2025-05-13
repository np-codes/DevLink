const { userAuth } = require("../middleware/auth");
const {validateEditProfileData } =  require("../utils/validation");
const User = require("../models/user");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

// Profile API : Finding User By ID - .findbyId()
router.get("/profile/view", userAuth, async(req,res) => {
    try {
        const user = req.user.toObject();
        delete user.password;
        res.json({
            message : "Here Is User Information : ",
            data : user
        }); 
    } catch(err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    };
});

// Updating User By ID - .findByIdAndUpdate()
router.patch("/profile/edit", userAuth, async(req,res) => {
    try{
        const userID = req?.user?._id;
        const data = req?.body;
        validateEditProfileData(data)

        if (data.skills) {
            if (!Array.isArray(data.skills) || data.skills.some(skill => Array.isArray(skill))) {
                throw new Error("Smart Move To Send Nested Array, But I Caught You.");
            }
            data.skills = data.skills
                .map(skill => skill
                        .trim()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                    ).filter(skill => skill.length > 0);
        };
        if(data.age) {
            const numericAge = Number(data.age);
            if (isNaN(numericAge)) {
                throw new Error("Please Enter A Valid Number");
            }
        }

        const user = await User.findByIdAndUpdate(userID, data, {
            runValidators: true,
        });
        res.json({ 
            message : `${user.firstName} !! Your Data Has Been Updated.`
        });
    } catch(err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }
});

// Updating User Password : User Is logged in And Changing Password.
router.patch("/profile/password", userAuth, async(req,res) => {
    try {
        const user = req.user
        const userEmailId = req.body.emailId;
        const newpassword = req.body.password;
        
        if (!userEmailId) {
            throw new Error ("To Change Password Your Email Is Required.")
        } else {
            if (userEmailId.toLowerCase() !== user.emailId) {
                throw new Error("That Email Doesn't Match Our Records.");
            };
            const passwordHash = await bcrypt.hash(newpassword, 10);
            user.password = passwordHash;
            await user.save();
            res.json({
                message : `${user.firstName} !! Your Password Has Been Updated.`
            });
        }        
    } catch(err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    };
})
module.exports = router;