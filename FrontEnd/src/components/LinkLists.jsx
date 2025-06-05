import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FriendCard from './FriendCard';
import { Action_On_Received_Request_API } from '../apis/linkAPIS';

const LinkLists = ({section}) => {
  const [flipped, setFlipped] = useState(false)
  const [friendCard, setFriendCard] = useState(null)
  const dispatch = useDispatch();

  const links = useSelector((store) => store.links?.[section + 'List'])
	if (!links || links.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-center bg-white rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-black p-6 border border-gray-200">
        <div className="text-5xl mb-3 animate-bounce">📭</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-1">
          No {section === "requests" ? "Friend Requests" : "Connections"} Found
        </h2>
        <p className="text-sm text-gray-500">
          {section === "requests"
            ? "Check back later for any new friend requests."
            : "Start connecting with people to grow your network!"}
        </p>
      </div>
    );

    const handleRequests = (status, friend) => {
      Action_On_Received_Request_API(status, friend , dispatch);
    };
  
  return (
    <div className="flex flex-col h-full min-h-0 w-full items-center text-center bg-white rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-black p-1 sm:p-3 md:p-6 border border-gray-200 overflow-hidden">
      <div className='"relative w-full h-full [perspective:1000px]"'>
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* front */}
          <div className="absolute h-full inset-0 backface-hidden overflow-hidden flex flex-col min-h-0">
            <div className="py-3 md:py-6 flex-shrink-0">
              <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold px-1 sm:px-4 py-2 rounded-lg shadow bg-gray-100 border-2 text-gray-800 max-h-[10vh]">
                {section === "connections"
                  ? "Your Connections"
                  : "Friend Requests"}
              </div>
            </div>
            <div
              tabIndex={0}
              className="flex-1 min-h-0 w-full flex justify-center overflow-y-auto no-scrollbar touch-pan-y"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
            >
              <ul className="w-full max-w-3xl space-y-2 sm:space-y-3 md:space-y-4 p-2 md:p-4 sm:p-3">
                {links.map((friend) => {
                  const { _id, firstName, lastName, photoUrl } = friend.user;
                  return (
                    <li
                      key={_id}
                      className="flex flex-col md:flex-row items-center gap-1 md:gap-4 p-3 md:p-4 bg-gray-100 border-2 border-blue-200 rounded-xl hover:shadow-lg hover:shadow-black hover:scale-102 transition duration-300 text-center md:text-left"
                    >
                      <img
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-purple-300 shadow"
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                      />
                      <div className="flex-1 md:flex md:items-center ">
                        <div className="text-md md:text-lg mb-1 font-semibold text-gray-800 flex items-stretch justify-center gap-2">
                          <h1>{firstName}</h1>
                          <h1>{lastName}</h1>
                        </div>
                        {section === "requests" ? (
                          <div className="w-full flex flex-wrap justify-center items-center gap-2 sm:gap-4 px-2 sm:px-5 font-bold text-sm sm:text-base">
                            <button
                              className="badge badge-outline py-2 px-4 transition-all duration-200 hover:bg-blue-400 hover:text-white hover:scale-105"
                              onClick={() => handleRequests("accepted", friend)}
                            >
                              ACCEPT
                            </button>
                            <button
                              className="badge badge-outline py-2 px-4 transition-all duration-200 hover:bg-green-400 hover:text-white hover:scale-105"
                              onClick={() => {
                                setFriendCard(friend);
                                setFlipped(true);
                              }}
                            >
                              VIEW
                            </button>
                            <button
                              className="badge badge-outline py-2 px-4 transition-all duration-200 hover:bg-red-400 hover:text-white hover:scale-105"
                              onClick={() => handleRequests("rejected", friend)}
                            >
                              REJECT
                            </button>
                          </div>
                        ) : (
                          <div className="w-full flex flex-wrap justify-center items-center gap-4 px-5 font-bold">
                            <button
                              className="badge badge-outline py-2 px-4 transition-all duration-200 hover:bg-green-400 hover:text-white hover:scale-105"
                              onClick={() => {
                                setFriendCard(friend);
                                setFlipped(true);
                              }}
                            >
                              VIEW
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              {friendCard && (
                <FriendCard
                  friend={friendCard}
                  section={section}
                  setFlipped={setFlipped}
                  handleRequests={handleRequests}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkLists