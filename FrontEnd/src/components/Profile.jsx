import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard';

const Profile = () => {
  const user = useSelector(store => store.user)
  return (
    <div className="flex justify-center items-center h-[calc(100vh-7.78rem)]  bg-gradient-to-br from-green-300 via-blue-200 to-cyan-100">
      <UserCard user={user} isFromProfile={true} />
    </div>
  );
}

export default Profile

