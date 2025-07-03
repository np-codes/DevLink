// Imported Files 
const connectDB = require('./config/database');

// Imported Inbuilt Libraries
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const app = express();

// Universal Path
app.use(
    cors({
        origin :  ["http://localhost:5173", "http://18.116.73.248"],
        credentials : true
    })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user"); 
const chatRouter = require("./routes/chat");
const initializeSocket = require('./utils/initializeSocket');

app.use("/", authRouter, profileRouter, requestRouter, userRouter, chatRouter);

const server = http.createServer(app);
initializeSocket(server)

connectDB().then(() => {
    console.log("Connection To Cluster Established Successfully..");
    server.listen(3000, () => {
        console.log("The Server Is Created Successfully..");
    });
})
.catch((err) => {
    console.error("Error In Connecting To Cluster..");
});