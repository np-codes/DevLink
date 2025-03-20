const express = require('express');

const app = express();

app.use("/test", (req,res) => {
    res.send("Hello from the server..");
});

app.use("/head", (req,res) => {
    res.send("This is head...");
});

app.use("/main", (req,res) => {
    res.send("This is main...");
});

app.listen(3000, () => {
    console.log("The serever is created successfully..");
});