import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';

const Chat = () => {
    const {recipientId} = useParams();

    const [ messages, setMessages ] = useState([
    ]);
    const [newMessage, setNewMessage] = useState("")
    
    const user = useSelector(store => store.user);
    const userId = user?._id;

    useEffect(() => {
        if (!userId){
            return;
        } 
        const socket = createSocketConnection();
        socket.emit("joinChat", {userId, recipientId});

        socket.on("receiveMessage", ({text}) => {
            console.log(text);
            setMessages( (messages) => [...messages, {text}])
        })
        return () => {
            socket.disconnect();
        }
    }, [userId, recipientId] );

    const sendMessage = () => {
        setNewMessage("")
        const socket = createSocketConnection();
        socket.emit("sendMessage",{userId, recipientId, text: newMessage});
    }

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto  rounded-2xl shadow-lg overflow-hidden p-6">
        <div className="flex items-center gap-4 p-3 border bg-gray-400 ">
            <div className="avatar">
            <div className="w-12 rounded-full border-2 border-purple-300 shadow">
                <img
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                alt="User Avatar"
                />
            </div>
            </div>
            <div>
            <h2 className="text-lg font-semibold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">Online</p>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto py-3 bg-gray-50">
            {messages.map((msg, index) => {
                return (
                
                  <div key={index} className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full"></div>
                    </div>
                    <div className="chat-header">
                      <time className="text-xs opacity-50 ml-2">12:45</time>
                    </div>
                    <div className="chat-bubble">{msg.text}</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                  </div>
                  
                );
            })}
        </div>

        {/* Input Field */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
            <input
            value = {newMessage}
            onChange = {(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type your message…"
            className="flex-1 input input-bordered w-full"
            />
            <button onClick={sendMessage} className="btn btn-primary">Send</button>
        </div>
        </div>
  );
}

export default Chat