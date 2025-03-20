const express = require('express');

const app = express();

app.get("/user", (req,res) => {
    res.send({fname: "Nish", lname: "Patel"});
});

app.post("/user", (req,res) => {
    res.send("Data is saved in DB");
});

app.use("/test", (req,res) => {
    res.send("This is test..");
});

app.delete("/user", (req,res) => {
    res.send("Data is deleted");
});

app.use("/main", (req,res) => {
    res.send("This is main...");
});

app.listen(3000, () => {
    console.log("The serever is created successfully..");
});