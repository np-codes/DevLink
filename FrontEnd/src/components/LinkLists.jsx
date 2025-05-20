import React from 'react'
import { useSelector } from 'react-redux'

const LinkLists = ({section}) => {
  
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
  
  return (
    <div className="h-full w-full flex flex-col items-center text-center bg-white rounded-xl transition-all duration-200 hover:shadow-lg hover: shadow-black p-6 border border-gray-200">
      <div className="py-6">
        <div className="text-2xl lg:text-3xl font-bold px-6 py-3 rounded-lg shadow bg-gray-100 border-2 text-gray-800">
          {section === "connections" ? "Your Connections" : "Friend Requests"}
        </div>
      </div>

      <ul className="w-full max-w-3xl space-y-5 p-4 overflow-y-auto">
        {links.map((friend, index) => {
          const { firstName, lastName, photoUrl, age, gender, about, skills } =
            friend;
          return (
            <li
              key={index}
              className="flex items-center gap-4 p-5 bg-gray-100 backdrop-blur-sm border-2 border-blue-200 rounded-xl  hover:shadow-lg transition duration-300"
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
                <div className="text-xs font-medium text-gray-500">
                  {age && `${age} •`} {gender}
                </div>
                {about !== "This Is Default Value" && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {about}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LinkLists