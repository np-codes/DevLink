const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user')
const app = express();

app.post("/signup", async(req,res) => {
    const user = new User({
        firstName: "Dev",
        lastName: "Patel",
        emailID: "Dev@gmail.com",
        password: "098765",
    });

    try {
        await user.save();
        res.send("New User Added Successfully.");
    } catch (err) {
        res.status(400).send("Error Occured : " + err.message);
    }
    
});

connectDB().then(() => {
    console.log("Connection To Cluster Established Successfully..");
    app.listen(3000, () => {
        console.log("The Serever Is Created Successfully..");
    });
})
.catch((err) => {
    console.error("Error In Connecting To Cluster..");
});