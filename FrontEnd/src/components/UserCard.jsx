import React, { useState } from 'react'
import EditProfile from './EditProfile';
import { useDispatch } from 'react-redux';
import { Send_Connection_Request_API } from '../APIS/linkAPIS';

const UserCard = ({ user, isFromProfile }) => {
  if (!user) return;

  const dispatch = useDispatch();
  const [flipped, setFlipped] = useState(false);
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  
  const makeRequest = (status, _id) => {
    Send_Connection_Request_API(status,_id,dispatch);
  }

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden px-2 sm:px-4 md:px-6">
      <div className="relative w-full h-full max-w-full [perspective:1000px] flex items-center justify-center">
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "rotate-y-180" : ""
          }`}
        >

          <div className="absolute inset-0 backface-hidden flex justify-center items-center px-4 sm:px-6 md:px-8">
            <div className="card w-full max-w-sm max-h-[calc(100vh-10rem)] bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-black hover:scale-103 transition duration-500 ease-in-out">
              <figure className="h-90 bg-gray-100 overflow-hidden">
                <img
                  src={photoUrl}
                  alt="User"
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body p-5 space-y-1 sm:space-y-2">
                <h2 className="card-title text-3xl sm:text-3xl font-semibold text-gray-800">
                  {firstName} {lastName}
                </h2>

                <p
                  className="text-gray-600 text-sm line-clamp-2 "
                  title={about && about}
                >
                  {about ||
                    "This user hasn’t written anything about themselves yet."}
                </p>

                {(age || gender || skills) && (
                  <div className="flex flex-col gap-1 text-sm text-gray-700 border-t border-gray-200 pt-3">
                    {age && <p>🎂 Age: {age}</p>}
                    {gender && <p>🚻 Gender: {gender}</p>}
                    {(skills != 0 || !skills) && (
                      <p>
                        🤹 Skills:{" "}
                        {Array.isArray(skills) ? skills.join(", ") : skills}
                      </p>
                    )}
                  </div>
                )}

                {!isFromProfile ? (
                  <div className="card-actions justify-between flex flex-col sm:flex-row items-center sm:items-end mt-3 px-5 sm:text-sm font-bold gap-3 sm:gap-0">
                    <button
                      className="badge badge-outline w-full sm:w-2/5 py-2 transition-all duration-300 hover:bg-red-400 hover:text-white hover:scale-105"
                      onClick={() => makeRequest("ignored", _id)}
                    >
                      IGNORE
                    </button>
                    <button
                      className="badge badge-outline w-full sm:w-2/5 py-2 transition-all duration-300 hover:bg-blue-400 hover:text-white hover:scale-105"
                      onClick={() => makeRequest("interested", _id)}
                    >
                      INTERESTED
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center mt-3 px-5 font-extrabold">
                    <button
                      onClick={() => setFlipped(true)}
                      className="w-full sm:w-1/2 py-2 rounded-md border-2 bg-gradient-to-br from-blue-400 to-purple-300 text-white transition-all duration-200 shadow-lg hover:text-black hover:shadow-black hover:scale-105"
                    >
                      EDIT
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180">
            <EditProfile user={user} flipBack={() => setFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
