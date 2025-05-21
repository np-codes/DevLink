const {userAuth} = require("../middleware/auth");
const ConnectionRequest =  require("../models/connectionRequest");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

const USER_DATA = "firstName lastName photoUrl about skills age gender";

// API TO Get The Pending Request From Users
router.get("/user/requests/received", userAuth, async(req,res) => {
    try {
        const loggedInId = req.user._id;
        const pendingRequests = await ConnectionRequest.find({
            toUserId : loggedInId,
            status : "interested"
        }).populate("fromUserId", USER_DATA);
        if (pendingRequests.length === 0) {
            return res.json({
                message : "There Are No Pending Requests."
            })
        }
        
        const filteredData = pendingRequests.map((request) => {
            return {
                linkId: request._id,
                user: request.fromUserId
            }
        })
        res.json({
            message: "The Following Is The List Of Pending Requests :",
            data : filteredData 
        })
    } catch (err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }
})

// API TO Get All The Connected Users
router.get("/user/connections", userAuth, async(req,res) => {
    try {
        const loggedInId = req.user._id;
        const connectedRequests = await ConnectionRequest.find({
            $or : [
                { fromUserId : loggedInId, status : "accepted" },
                { toUserId : loggedInId, status : "accepted" }
            ],
        }).populate("fromUserId",USER_DATA).populate("toUserId",USER_DATA);

        if (connectedRequests.length === 0) {
            return res.json({
                message : "There Are No Connected Requests."
            });
        }

        const filteredData = connectedRequests.map((request) => {
            const user = request.fromUserId._id.equals(loggedInId)? request.toUserId : request.fromUserId;
            return {
                linkId: request._id, 
                user: user
            }
        });
        res.json({
            message: "The Following Is The List Of Connected Requests :",
            data : filteredData
        });

    } catch (err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }
})

// Feed API To Get Data Of Random Users
router.get("/user/feed", userAuth, async(req,res) => {
    try{
        const loggedInId = req.user._id;
        const page = parseInt(req?.query?.page) || 1;
        let limit = parseInt(req?.query?.limit) || 10;
        limit = limit > 10 ? 10 : limit;
        const skip = (page - 1) * limit;

        const allConnectionRequests = await ConnectionRequest.find({
            $or : [
                { fromUserId : loggedInId },
                { toUserId : loggedInId }
            ]
        }).select("fromUserId toUserId")
        const hideUsersFromFeed = new Set();
        allConnectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        })

        const randomUsersInFeed = await User.find({ 
            $and : [
                { _id : { $nin: Array.from(hideUsersFromFeed)} },
                { _id : { $ne : loggedInId } }
            ]
        })
            .skip(skip)
            .limit(limit)
            .select(USER_DATA)
        res.json({
            data : randomUsersInFeed 
        })
    } catch(err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }
}) 

module.exports = router