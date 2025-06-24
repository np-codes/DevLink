const jwt = require("jsonwebtoken");

const socketAuth = async(socket,next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Authentication failed: No token provided"));
    }

    try{
        const user = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        socket.user = user;
        next();
    } catch (err) {
        next(new Error("Authentication failed: Invalid token"));
    }
};

module.exports = socketAuth;