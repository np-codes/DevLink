const socket = require("socket.io");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    });
    io.on("connection", (socket) => {
        socket.on("joinChat", ({userId, recipientId}) => {
            const roomId = [userId, recipientId].sort().join("_");
            socket.join(roomId);
        });
        
        socket.on("sendMessage", ({userId, recipientId, text}) => {
            const roomId = [userId, recipientId].sort().join("_");
            io.to(roomId).emit("receiveMessage", {text});
        });

        socket.on("disconnect", () => {

        })
    })
};

module.exports = initializeSocket;