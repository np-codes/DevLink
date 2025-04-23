import React from 'react'

const UserCard = ({user}) => {
    const { firstName, lastName, photoUrl, age, gender, about} = user
  return (
    <div>
      <div className="card w-96 bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-black hover:scale-103 transition duration-500 ease-in-out">
        <figure className="h-90 bg-gray-100 overflow-hidden">
          <img
            src={photoUrl}
            alt="User"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body p-5 space-y-2">
          <h2 className="card-title text-3xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>

          <p className="text-gray-600 text-sm">
            {about || "This user hasn’t written anything about themselves yet."}
          </p>

          {(age || gender) && (
            <div className="flex flex-col gap-1 text-sm text-gray-700 border-t border-gray-200 pt-3">
              {age && <p>🎂 Age: {age}</p>}
              {gender && <p>🚻 Gender: {gender}</p>}
            </div>
          )}
          <div className="card-actions justify-between flex items-end mt-4 px-5 font-bold">
            <button className="badge badge-outline w-2/5 mr-2 py-2 transition-all duration-300  hover:bg-red-400 hover:text-white hover:scale-105">
              IGNORE
            </button>
            <button className="badge badge-outline w-2/5 ml-2 py-2 transition-all duration-300  hover:bg-blue-400 hover:text-white hover:scale-105">
              INTERESTED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard