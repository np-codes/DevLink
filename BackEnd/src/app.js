const express = require('express');

const app = express();

const { authAdmin, authUser } = require('./middleware/auth.js');
const e = require('express');

// Request for Admin
app.use("/admin", 
    authAdmin,
);
app.get("/admin/getdata", (req,res) => {
    throw new Error ("Error occured...")
    res.send("All data");
});
app.get("/admin/deletedata", (req,res) => {
    res.send("Delete Data");
})

// Request for User
app.get("/user", 
    authUser,
);
app.get("/user/login",(req,res) => {
    res.send("User login..")
});
app.get("/user/data",(req,res) => {
    res.send("User data..")
});

// Error Handling
app.use("/", (err,req,res,next) => {
    if(err) {
        res.status(500).send("Something went wrong")
    }
})

app.listen(3000, () => {
    console.log("The serever is created successfully..");
});