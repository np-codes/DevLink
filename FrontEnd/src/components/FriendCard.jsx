import React from 'react'

const FriendCard = ({friend, section, setFlipped, handleRequests}) => {
    const { firstName, lastName, photoUrl, age, gender, about, skills } = friend.user;
  return (
    <div className="card card-top w-full h-full bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-black">
      <figure className="p-6 bg-gray-100 flex justify-center">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full border-4 border-purple-300 shadow-md object-cover"
        />
      </figure>

      <div className="card-body text-center space-y-3 px-6 pb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-gray-500">
          {age && `${age} •`} {gender}
        </p>

        {about !== "This Is Default Value" && (
          <p className="text-sm text-gray-600">{about}</p>
        )}

        {skills && Array.isArray(skills) && skills.length > 0 && (
          <p className="text-sm text-gray-700">
            🤹 Skills: {skills.join(", ")}
          </p>
        )}

        <div className="mt-4 grid grid-cols-3 gap-4 text-lg font-medium items-center">
          {section === "requests" ? (
            <>
              <button
                className="px-4 py-2 col-start-1 col-end-2 rounded-full border-2 border-blue-400 text-blue-600 hover:bg-blue-400 hover:text-white transition duration-200"
                onClick={() => { 
                  setFlipped(false);
                  handleRequests("accepted", friend)
                }}
              >
                ACCEPT
              </button>

              <button
                className="px-4 py-2 col-start-2 col-end-3 rounded-full border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white transition duration-200"
                onClick={() => setFlipped(false)}
              >
                CLOSE
              </button>

              <button
                className="px-4 py-2 col-start-3 col-end-4 rounded-full border-2 border-red-400 text-red-600 hover:bg-red-400 hover:text-white transition duration-200"
                onClick={() => {
                  setFlipped(false);
                  handleRequests("rejected", friend)
                }}
              >
                REJECT
              </button>
            </>
          ) : (
            <>
              <div className="col-start-1 col-end-2" />
              <button
                className="px-4 py-2 col-start-2 col-end-3 rounded-full border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white transition duration-200"
                onClick={() => setFlipped(false)}
              >
                CLOSE
              </button>
              <div className="col-start-3 col-end-4" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendCard