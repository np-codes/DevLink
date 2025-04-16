const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

// Send Request API
router.post("/request/send/:status/:touserid", userAuth, async(req,res) => {
    try {
        const fromUserId = req.user?._id;
        const toUserId = req.params?.touserid;
        const status = req.params?.status;
        
        const exitsToUserId = await User.findById(toUserId);
        if (!exitsToUserId) {
            throw new Error (" User Does Not Exists.");
        }
        const isValidStatus = ["ignored", "interested"].includes(status);
        if (!isValidStatus) {
            throw new Error("Invalid Status.");
        };

        const existingConnection = await ConnectionRequest.findOne({
            $or : [
                { fromUserId, toUserId },
                { fromUserId : toUserId, toUserId : fromUserId }
            ]
        });
        
        if (existingConnection) {
            const isRestrictedRequest = ["accepted","rejected"].includes(existingConnection.status)
            if (existingConnection.status !== status && !isRestrictedRequest) {
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

// Received Request API
router.post("/request/receive/:status/:requestid", userAuth, async(req,res) => {
    try{
        const loggedInId = req.user?._id;
        const status = req.params?.status;
        const requestId = req.params?.requestid;
        const isValidStatus = ["accepted","rejected"].includes(status);
        if (!isValidStatus) {
            throw new Error ("Invalid Status.")
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInId,
            $or : [
                { status : "interested" },
                { status : "accepted" },
                { status : "rejected" }
            ]
        })
        if (!connectionRequest) {
            throw new Error ("The Connection Request Does Not Exists.")
        }
        if (status === connectionRequest.status) {
            return res.send(`The Connection Request Was Already ${status}.`)
        }
        connectionRequest.status = status;
        connectionRequest.save();
        res.send(`You Have ${status} the Connection Request.`)

    } catch (err) {
        res.status(400).send("Error Occured : " + err.message);
    };
})

module.exports = router;

