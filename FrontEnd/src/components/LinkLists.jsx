import React from 'react'
import { useSelector } from 'react-redux'

const LinkLists = ({section}) => {
  
  const links = useSelector((store) => store.links?.[section + 'List'])
  
	if(!links) return;
  if(links.length ===0) return <p1>No Connections Found..</p1>
  return (
    <div className="">
      <div className="flex justify-center items-center py-10  rounded-xl ">
        <div className="text-3xl lg:text-4xl font-bold px-6 py-4 bg-white rounded-lg shadow-md text-gray-800">
          Your Friend List
        </div>
      </div>

      <div className="flex justify-center">
        <ul className="w-4/5 md:w-3/4 lg:w-2/3 space-y-4 bg-red-300">
          {links.map((friend, index) => {
            const {
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skills,
            } = friend;
            return (
              <li
                key={index}
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <img
                    className="w-14 h-14 rounded-full border-2 border-blue-300 shadow"
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-800">
                    {firstName} {lastName}
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">
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
    </div>
  );
}

export default LinkLists