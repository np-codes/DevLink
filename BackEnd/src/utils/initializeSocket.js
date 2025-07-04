const { Server } = require("socket.io");
const socketAuth = require("../middleware/socketAuth");
const getRoomId = require("./getRoomId")
const Chat = require("../models/chat");
const Message = require("../models/message");

const chatBuffers = new Map();
const roomUsers = new Map();

const initializeSocket = (server) => {
    const io = new Server (server, {
        path: "/api/socket.io",
        cors: {
            origin: ["http://localhost:5173", "http://18.116.73.248"],
            credentials: true,
        }
    });
    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log("Connection made")
        socket.on("joinChat", async({userId, recipientId}) => {
            const roomId = getRoomId(userId, recipientId)
            socket.join(roomId);

            if (!roomUsers.has(roomId)) roomUsers.set(roomId, new Set())
            roomUsers.get(roomId).add(socket.id);

            const participants = [userId, recipientId].sort();
            let chat = await Chat.findOne({ participants: {$all: participants, $size:2}});

            if (!chat) {
                chat = await Chat.create({participants});
                chatBuffers.set(roomId, {chatId: chat._id, messages: []});
                socket.emit("previousMessages", []);
                return;
            }
            if (!chatBuffers.has(roomId)) {
                chatBuffers.set(roomId, { chatId: chat._id, messages: [] });
            }

            const dbMessages = await Message.find({chatId: chat._id})
                .sort({timestamp:1})
                .limit(50)
                .lean();

            const buffer = chatBuffers.get(roomId);
            const bufferMessages = buffer?.messages || [];
            const allMessages = [...dbMessages, ...bufferMessages];
            allMessages.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
            socket.emit("previousMessages", allMessages)
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
            for (const[ roomId, sockets] of roomUsers.entries()){
                sockets.delete(socket.id);
                
                if(sockets.size === 0){
                    const buffer = chatBuffers.get(roomId);
                    if( buffer && buffer.messages.length > 0) {
                       const inserted = await Message.insertMany(buffer.messages);
                        await Chat.findByIdAndUpdate(buffer.chatId, {
                            lastMessage: inserted.at(-1)._id,
                    });
                }
                chatBuffers.delete(roomId);
                roomUsers.delete(roomId);
                }
            }
        });
    });
};

module.exports = initializeSocket;