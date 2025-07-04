import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = (token) => {
    return io(BASE_URL, {
        auth: {
            token,
        },
        transports: ["websocket"],
    });
};