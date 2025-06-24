const socket = require("socket.io");
const { getRoomId } = require("./getRoomId");
const socketAuth = require("../middleware/socketAuth");
const Chat = require("../models/chat");
const Message = require("../models/message");

const chatBuffers = new Map();

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    });

    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log("Connected:", socket.user);
        socket.on("joinChat", async({userId, recipientId}) => {
            const roomId = getRoomId(userId, recipientId)
            socket.join(roomId);

            const participants = [userId, recipientId].sort();
            let chat = await Chat.findOne({ participants: {$all: participants, $size:2}});
            if (!chat) {
                chat = await Chat.create({participants});
                chatBuffers.set(roomId, {chatId: chat._id, messages: []});
                socket.emit("previousMessages", []);
                return;
            }
            chatBuffers.set(roomId, {chatId: chat._id, messages: []});
            const prevMessages = await Message.find({chatId: chat._id})
                .sort({timestamp:1})
                .lean();
            socket.emit("previousMessages", prevMessages)
        });
        
        socket.on("sendMessage", ({userId, recipientId, text}) => {
            const roomId = getRoomId(userId, recipientId);

            const buffer = chatBuffers.get(roomId);
            if(!buffer) return;

            const message = {
                chatId: buffer.chatId,
                senderId: userId,
                text,
                timestamp: new Date(),
            };

            buffer.messages.push(message);
    
            io.to(roomId).emit("receiveMessage", {
                ...message,
                _id: Date.now()
            });
        });

        socket.on("disconnect", async() => {
            for (const [roomId, {chatId, messages}] of chatBuffers.entries()) {
                if (messages.length > 0) {
                    const inserted = await Message.insertMany(messages);
                    await Chat.findByIdAndUpdate(chatId, {
                        lastMessage: inserted.at(-1)._id,
                    });
                }
                chatBuffers.delete(roomId);
            }
            console.log("disconnected")
        });
    });
};

module.exports = initializeSocket;