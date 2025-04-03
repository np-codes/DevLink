// Imported Files 
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validator');
const { userAuth } = require('./middleware/auth');

// Imported Inbuilt Libraries
const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();

// Universal Path
app.use(express.json());
app.use(cookieParser());

//Signup API
app.post("/signup", async(req,res) => {
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
app.post("/login", async(req,res) => {
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
        res.send("Login Successfull.");
    } catch (err) {
        res.status(400).send("Error Occured : " + err.message);
    }
})

// Profile API : Finding User By ID - .findbyId()
app.get("/profile", userAuth, async(req,res) => {
    try {
        const user = req.user;
        res.send(user); 
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    };
})

app.post("/sendconnectionrequest", userAuth, async(req,res) => {
    const user = req.user;
    res.send(`${user.firstName} Sent A Connection Request.`)
});
// Updating User By ID - .findByIdAndUpdate()
app.patch("/user/:userid", async(req,res) => {
    const userID = req.params?.userid;
    const data = req.body;
    try{
        // Limiting Fields To User For Updating 
        const ALLOWED_UPDATES = ["lastName","password","age","gender","photoUrl","about","skills"];
        const notAllowedFields = Object.keys(data).filter((k) => !ALLOWED_UPDATES.includes(k));
        if(notAllowedFields.length > 0){
            throw new Error(`Update Is Not Allowed For Following Fields:\n ${notAllowedFields.join(", ")}`);
        };
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

        if(!user){
            res.status(404).send(`User With ID: ${userID} Was not Found.`);
        } else { 
            res.send(`User Data With ID: ${userID} Has Been Updated.`);
        }
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    }
}); 

connectDB().then(() => {
    console.log("Connection To Cluster Established Successfully..");
    app.listen(3000, () => {
        console.log("The Server Is Created Successfully..");
    });
})
.catch((err) => {
    console.error("Error In Connecting To Cluster..");
});