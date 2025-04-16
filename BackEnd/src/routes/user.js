const {userAuth} = require("../middleware/auth");
const ConnectionRequest =  require("../models/connectionRequest");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

// API TO Get All The Pending Requests For User
router.get("/user/requests/received", userAuth, async(req,res) => {
    try {
        const loggedInId = req.user._id;
        const pendingRequests = await ConnectionRequest.find({
            toUserId : loggedInId,
            status : "interested"
        }).populate("fromUserId", "firstName lastName photoUrl about");
        if (pendingRequests.length === 0) {
            return res.send("There Are No Pending Requests.")
        }
        const filteredData = pendingRequests.map((request) => {
            const user = request.fromUserId;
            return {
                firstName : user.firstName,
                lastName : user.lastName,
                photoUrl : user.photoUrl,
                about : user.about
            }
        })
        res.send({
            message: "The Following Is The List Of Pending Requests :",
            data : filteredData 
        })
    } catch (err) {
        res.status(400).send("Error Occured: " + err.message)
    }
})

// API TO Get All The Connected Requests For User
router.get("/user/connections", userAuth, async(req,res) => {
    try {
        const loggedInId = req.user._id;
        const connectedRequests = await ConnectionRequest.find({
            $or : [
                { fromUserId : loggedInId, status : "accepted" },
                { toUserId : loggedInId, status : "accepted" }
            ],
        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");

        if (connectedRequests.length === 0) {
            return res.send("There Are No Connected Requests.")
        }

        const filteredData = connectedRequests.map((request) => {
            const user = request.fromUserId._id.equals(loggedInId)? request.toUserId : request.fromUserId;
            return {
                firstName : user.firstName,
                lastName : user.lastName,
            }
        });

        res.send({
            message: "The Following Is The List Of Connected Requests :",
            data : filteredData
        });

    } catch (err) {
        res.status(400).send("Error Occured: " + err.message)
    }
})

module.exports = router