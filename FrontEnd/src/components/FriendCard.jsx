import React from 'react'

const FriendCard = ({friend, section, setFlipped, handleRequests}) => {
    const { firstName, lastName, photoUrl, age, gender, about, skills } = friend.user;
  return (
    <div className="card card-top w-full h-full bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-black">
      <figure className="p-4 md:p-8 bg-gray-100 flex justify-center">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full border-4 border-purple-300 shadow-md object-cover"
        />
      </figure>

      <div className="card-body flex justify-evenly items-center space-y-0.5 sm:space-y-2 px-4 ">
        <div className="space-y-2 text-center items-center md:space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {firstName} {lastName}
          </h2>
          <p className="text-sm md:text-xl text-gray-500">
            {age && `${age} •`} {gender}
          </p>
          {about !== "This Is Default Value" && (
            <p className="text-xs sm:text-sm md:text-lg text-gray-600 line-clamp-3 md:line-clamp-7 max-w-[90%] ">
              {about}
            </p>
          )}
          {skills && Array.isArray(skills) && skills.length > 0 && (
            <p className="text-xs sm:text-sm md:text-lg text-gray-700 line-clamp-3 md:line-clamp-7 max-w-[90%]">
              🤹 Skills: {skills.join(", ")}
            </p>
          )}
        </div>

        <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-lg font-medium items-center w-full">
          {section === "requests" ? (
            <>
              <button
                className="w-full px-4 py-1 sm:py-2 rounded-full border-2 border-blue-400 text-blue-600 hover:bg-blue-400 hover:text-white transition duration-200"
                onClick={() => {
                  setFlipped(false);
                  handleRequests("accepted", friend);
                }}
              >
                ACCEPT
              </button>

              <button
                className="w-full px-4 py-1 sm:py-2 rounded-full border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white transition duration-200"
                onClick={() => setFlipped(false)}
              >
                CLOSE
              </button>

              <button
                className="w-full px-4 py-1 sm:py-2 rounded-full border-2 border-red-400 text-red-600 hover:bg-red-400 hover:text-white transition duration-200"
                onClick={() => {
                  setFlipped(false);
                  handleRequests("rejected", friend);
                }}
              >
                REJECT
              </button>
            </>
          ) : (
            <>
              <div className="hidden sm:block" />
              <button
                className="w-full px-4 py-1 sm:py-2 rounded-full border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white transition duration-200"
                onClick={() => setFlipped(false)}
              >
                CLOSE
              </button>
              <div className="hidden sm:block" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendCard