import React, { useEffect } from 'react'
import { User_Connections_API } from '../utils/userAPIS'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections)
	const user = useSelector((store) => store.user);
  const fetchUserConnections = () => {
    User_Connections_API({dispatch});
  }
  useEffect(() => {
      fetchUserConnections();
  },[]);
	if(!connections) return;
  if(connections.length ===0) return <p1>No Connections Found..</p1>
  return (
    <div className="w-full h-full bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 ">
      <div className="flex justify-center items-center py-10  rounded-xl ">
        <div className="px-4">
          <img
            className="w-20 h-20 rounded-full border-4 border-purple-400 shadow-lg"
            src={user.photoUrl}
            alt="User"
          />
        </div>
        <div className="text-4xl font-bold px-6 py-4 bg-white rounded-lg shadow-md text-gray-800">
          Your Friend List
        </div>
      </div>

      <div className="flex justify-center">
        <ul className="w-4/5 md:w-2/3 lg:w-1/2 space-y-4">
          {connections.map((friend, index) => {
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
                    className="w-16 h-16 rounded-full border-2 border-blue-300 shadow"
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

export default Connections