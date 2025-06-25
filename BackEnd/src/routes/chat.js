const express = require("express");
const { userAuth } = require("../middleware/auth");
const router = express.Router();
const Chat = require("../models/chat");
const Message = require("../models/message")

router.get("/chats/:userId", userAuth, async(req, res) => {
    try{
        const {userId}  = req?.params;
        const chats = await Chat.find({participants: userId})
            .populate("participants","firstName lastName photoUrl")
            .sort({updatedAt: -1});
        const filterChats = chats.map((chat) => {
            const filterParticipants = chat.participants.filter((user) => {
                return user._id.toString() !== userId.toString();
            });
            return {
                recipient: filterParticipants[0], 
                chatId: chat._id 
            };
        });

        res.json({ 
            message : `Data Sent Successfully`,
            data: filterChats
        });
    } catch(err) {
        res.status(400).json({ error: "Error Occurred", message: err.message });
    }    
});

module.exports = router;