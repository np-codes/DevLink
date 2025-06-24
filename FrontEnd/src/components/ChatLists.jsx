import React, { useEffect, useState } from 'react'
import { Fetch_Chats_List } from '../apis/chatAPIS';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatLists = () => {
    const [ chatsList, setChatsList ] = useState(null);
    const navigate = useNavigate();
    const userId = useSelector((store) => store?.user?._id)
    if (!userId) return;

    const fetchChatList = async() => {
        const data = await Fetch_Chats_List(userId)
        setChatsList(data)
    }

    useEffect(() => {
        fetchChatList()
    },[]);

    return (
      <div className="flex items-center justify-center  bg-green-100 h-full w-full">
        <div
          className="p-4 space-y-4 w-3/4 md:w-1/2 overflow-y-auto no-scrollbar touch-pan-y max-h-[calc(100vh-9rem)]"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          {chatsList?.map((chat, index) => {
            const { firstName, lastName, photoUrl, _id } = chat.recipient;
            return (
              <div
                key={index}
                className="flex justify-between items-center bg-white dark:bg-base-100 p-3 md:p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200"
                onClick={() => navigate(`/chats/${_id}`)}
              >
                <div className="flex-1 flex justify-center-safe">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full border border-gray-300"
                  />
                </div>
                <div className="flex-1 ">
                  <p className=" text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {firstName} {lastName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default ChatLists