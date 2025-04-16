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
        }).populate("toUserId", "firstName lastName");
        
        if (existingConnection) {
            const isRestrictedRequest = ["accepted","rejected"].includes(existingConnection.status)
            if (existingConnection.status !== status && !isRestrictedRequest) {
                existingConnection.status = status;
                await existingConnection.save();
                const { firstName, lastName } = existingConnection?.toUserId;
                return res.json({ 
                    message : `Connection Status With ${ firstName } ${ lastName } Has Been Updated To ${status.toUpperCase()}.`
                });
            }
            return res.json({ 
                message : `Connection Request Already Exists.`
            });
        }
        const connectionRequest = await new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        }).save();
        await connectionRequest.populate("toUserId", "firstName lastName");
        const { firstName, lastName } = connectionRequest?.toUserId;
        res.json({ message : `You Have Successfully Sent Connection Request to ${ firstName } ${ lastName }.` });
    } catch(err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
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
        }).populate("fromUserId", "firstName lastName");

        if (!connectionRequest) {
            throw new Error ("The Connection Request Does Not Exists.")
        }
        const { firstName, lastName } = connectionRequest?.fromUserId;
        if (status === connectionRequest.status) {
            return res.json({ 
                message : `Connection Status With ${ firstName } ${ lastName } Was Already "${status.toUpperCase()}".`
            });
        }
        connectionRequest.status = status;
        connectionRequest.save();
        res.json({ 
            message : `You Have ${status} the Connection Request Of ${ firstName } ${ lastName }.`
        });
    } catch (err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    };
})

module.exports = router;

