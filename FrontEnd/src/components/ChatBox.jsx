import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';

const ChatBox = () => {
    const {recipientId} = useParams();

    const [ messages, setMessages ] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const socketRef = useRef(null);
    
    const user = useSelector(store => store.user);
    const links = useSelector(store =>store.links)
    const recipient = links?.connectionsList.find((friend) => {
        return friend.user._id === recipientId
    })
    const  {firstName, lastName, photoUrl}  = recipient?.user
    const userId = user?._id;

    useEffect(() => {
        if (!userId){
            return;
        } 
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
          
        socketRef.current = createSocketConnection(token);

        socketRef.current.on("connect_error", (err) => {
          console.error("Connection error:", err.message);
        });
        
        socketRef.current.emit("joinChat", {userId, recipientId});

        socketRef.current.on("previousMessages", (prevMessages) => {
            setMessages(prevMessages);
        })

        socketRef.current.on("receiveMessage", ({...message}) => {
            console.log(message);
            const {senderId, text, timestamp} = message
            setMessages((prev) => [...prev, { senderId, text, timestamp}]);
        })

        return () => {
            socketRef.current.disconnect();
        }
    }, [userId, recipientId] );

    const sendMessage = () => {
        socketRef.current.emit("sendMessage", {
          userId,
          recipientId,
          text: newMessage,
        });
        setNewMessage("");
    }

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto  rounded-2xl shadow-lg overflow-hidden p-6">
        <div className="flex items-center gap-4 p-3 border bg-gray-400 ">
            <div className="avatar">
            <div className="w-12 rounded-full border-2 border-purple-300 shadow">
                <img
                src={photoUrl}
                alt="User Avatar"
                />
            </div>
            </div>
            <div>
            <h2 className="text-lg font-semibold text-gray-800">{firstName}  {lastName}</h2>
            <p className="text-sm text-gray-500">Online</p>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto py-3 bg-gray-50">
            {messages.map((msg, index) => {
                return msg.senderId === recipientId ? (
                  <div key={index} className="chat chat-start mb-2">
                    <div className="pl-1 chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={photoUrl}
                        />
                      </div>
                    </div>
                    <div className="chat-header mb-1">
                      <time className="text-xs ml-2">
                        {msg.timestamp}
                      </time>
                    </div>
                    <div className="chat-bubble ml-2">{msg.text}</div>
                  </div>
                ) : (
                  <div key={index} className="chat chat-end mb-2">
                    <div className="chat-header mb-1">
                      <time className="text-xs ml-2">
                        {msg.timestamp}
                      </time>
                    </div>
                    <div className="chat-bubble">{msg.text}</div>
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

export default ChatBox;