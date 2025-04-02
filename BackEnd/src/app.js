const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const  { validateSignUpData } = require('./utils/validator');
const validator = require("validator");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

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
    try{
        const { emailId, password } = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error(`${emailId} Is Invalid Email.`)
        }
        const user = await User.findOne({emailId : emailId });
        if(!user){
            throw new Error("Invalid Credentials - Dont Give Up, Try Another Again.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid Credentials - Dont Give Up, Try Another Again.");
        }
        res.send("Login Successfull.")
    } catch (err) {
        res.status(400).send("Error Occured : " + err.message);
    }
})

// Finding User By Email - .find()
app.get("/user", async(req,res) => {
    const userEmail = req.body?.emailID;
    try{
        const user = await User.find({emailId : userEmail});
        if (!user) {
            res.status(404).send(`User With Email: ${userEmail} Was not Found.`);
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    };
});

// Finding User By ID - .findbyId()
app.get("/user/:userid", async(req,res) => {
    const userID = req.params?.userid;
    try{
        const user = await User.findById({_id : userID});
        if (!user) {
            res.status(404).send(`User With ID: ${userID} Was Not Found.`);
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    };
})

// Getting All Users 
app.get("/feed", async(req,res) => {
    try{
        const user = await User.find({});
        if (!user) {
            res.status(404).send("The Database is Empty.");
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    }
});

// Deleting User By ID - .findByIdAndDelete()
app.delete("/user", async(req,res) => {
    const userID = req.body?.userid;
    try{
        const user = await User.findByIdAndDelete(userID);
        if(!user){
            res.status(404).send(`User With ID: ${userID} Was Not Found.`);
        } else { 
            res.send(`User With ID: ${userID} Is Deleted. `);
        }
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    }
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

// Updating User By Email - .findOneAndUpdate()
/* app.patch("/user", async(req,res) => {
    const userEmailId = req.body.emailID;
    const data = req.body;
    try{
        const user = await User.findOneAndUpdate({emailID : userEmailId}, data);
        if( !user ){
            res.status(404).send(`User With Email: ${userEmailId} Was Not Found.`);
        } else {
            res.send(`User Data With Email: ${userEmailId} Has Been Updated.`);
        }
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    }
}); */

connectDB().then(() => {
    console.log("Connection To Cluster Established Successfully..");
    app.listen(3000, () => {
        console.log("The Serever Is Created Successfully..");
    });
})
.catch((err) => {
    console.error("Error In Connecting To Cluster..");
});