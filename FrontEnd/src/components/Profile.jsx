import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard';

const Profile = () => {
  const user = useSelector(store => store.user)
  return (
    <div className="flex justify-center items-center h-[calc(100vh-8.3rem)]  bg-gradient-to-br from-blue-400 to-purple-300 ">
      <UserCard user={user} isFromProfile={true} />
    </div>
  );
}

export default Profile

