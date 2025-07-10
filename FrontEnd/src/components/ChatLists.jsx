import React, { useEffect, useState } from 'react'
import { Fetch_Chats_List } from '../apis/chatAPIS';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User_Connections_API, User_Requests_API } from '../apis/userAPIS';

const ChatLists = () => {
    const [ chatsList, setChatsList ] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store?.user?._id)
    if (!userId) return;

    const fetchChatList = async() => {
        User_Connections_API({ dispatch });
        User_Requests_API({ dispatch });
        const data = await Fetch_Chats_List(userId)
        setChatsList(data)
    }

    useEffect(() => {
        fetchChatList()
    },[]);

    return (
      <div className="flex items-center justify-center bg-green-100 h-full w-full">
        <div
          className="p-4 space-y-4 w-3/4 md:w-1/2 overflow-y-auto no-scrollbar touch-pan-y max-h-[calc(100vh-9rem)]"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          {chatsList === null ? (
            <p className="text-center text-gray-700 text-lg">
              Loading chats...
            </p>
          ) : chatsList.length === 0 ? (
            <p className="text-center text-gray-500 text-lg font-medium">
              You don’t have any chats yet.
            </p>
          ) : (
            chatsList.map((chat, index) => {
              const { firstName, lastName, photoUrl, _id } = chat.recipient;
              return (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white dark:bg-base-100 p-3 md:p-4 rounded-2xl hover:shadow-md hover:shadow-black hover:scale-102 transition duration-300"
                  onClick={() => navigate(`/chats/${_id}`)}
                >
                  <div className="flex-1 flex justify-center-safe">
                    <img
                      src={photoUrl}
                      alt={`${firstName} ${lastName}`}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full border border-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate">
                      {firstName} {lastName}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
}

export default ChatLists