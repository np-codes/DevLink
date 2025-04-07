const { userAuth } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.post("/sendconnectionrequest", userAuth, async(req,res) => {
    try {
        const user = req.user;
        res.send(`${user.firstName} Sent A Connection Request.`) 
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    };
});

module.exports = router;

