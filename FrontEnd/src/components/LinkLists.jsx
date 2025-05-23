import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FriendCard from './FriendCard';
import {Action_On_Received_Request_API} from '../apis/linkAPIS'
import { popRequestFromList, pushNewConnectionToList } from '../utils/linkSlice';

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
      dispatch(popRequestFromList(friend?.linkId));
      if(status === "accepted"){
        dispatch(pushNewConnectionToList(friend))
      }
      Action_On_Received_Request_API(status, friend?.linkId);
    };
  
  return (
    <div className="h-full w-full flex flex-col items-center text-center bg-white rounded-xl transition-all duration-200 hover:shadow-lg hover: shadow-black p-6 border border-gray-200">
      <div className='"relative w-full h-full [perspective:1000px]"'>
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* front */}
          <div className="absolute h-full inset-0 backface-hidden overflow-hidden flex flex-col">
            <div className="py-6 flex-shrink-0">
              <div className="text-2xl lg:text-3xl font-bold px-6 py-3 rounded-lg shadow bg-gray-100 border-2 text-gray-800">
                {section === "connections"
                  ? "Your Connections"
                  : "Friend Requests"}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto w-full flex justify-center no-scrollbar touch-pan-y">
              <ul className="w-full max-w-3xl space-y-5 p-6 ">
                {links.map((friend) => {
                  const { _id, firstName, lastName, photoUrl } = friend.user;
                  return (
                    <li
                      key={_id}
                      className="flex items-center gap-4 p-5 bg-gray-100 border-2 border-blue-200 rounded-xl hover:shadow-lg hover:shadow-black hover:scale-102 transition duration-300"
                    >
                      <img
                        className="w-14 h-14 rounded-full border-2 border-purple-300 shadow"
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                      />
                      <div className="flex-1">
                        <div className="text-lg font-semibold text-gray-800">
                          {firstName} {lastName}
                        </div>
                        {section === "requests" ? (
                          <div className="w-full flex flex-wrap justify-center items-center gap-4 mt-3 px-5 font-bold">
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
                          <div className="w-full flex flex-wrap justify-center items-center gap-4 mt-3 px-5 font-bold">
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
            <div className="w-full h-full bg-amber-100 flex items-center justify-center">
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