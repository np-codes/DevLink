const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

router.post("/request/send/:status/:touserid", userAuth, async(req,res) => {
    try {
        const fromUserId = req.user?._id;
        const toUserId = req.params?.touserid;
        const status = req.params?.status;
        
        const exitsToUserId = await User.findById(toUserId);
        if(!exitsToUserId){
            throw new Error (" User Does Not Exists.");
        }
        
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status.");
        };

        const existingConnection = await ConnectionRequest.findOne({
            $or : [
                { fromUserId, toUserId },
                { fromUserId : toUserId, toUserId : fromUserId }
            ]
        });
        if(existingConnection){
            if(existingConnection.status !== status){
                existingConnection.status = status;
                await existingConnection.save();
                return res.send(`Connection Request Status Has Been Updated To "${status}".`);
            }
            return res.send(`Connection Request Already Exists.`);
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        await connectionRequest.save();
        res.send("Connection Request Sent Successfully.");
    } catch(err) {
        res.status(400).send("Error Occured : " + err.message);
    };
});

module.exports = router;

