// Imported Files 
const connectDB = require('./config/database');

// Imported Inbuilt Libraries
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Universal Path
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user"); 

app.use("/", authRouter, profileRouter, requestRouter, userRouter);

connectDB().then(() => {
    console.log("Connection To Cluster Established Successfully..");
    app.listen(3000, () => {
        console.log("The Server Is Created Successfully..");
    });
})
.catch((err) => {
    console.error("Error In Connecting To Cluster..");
});