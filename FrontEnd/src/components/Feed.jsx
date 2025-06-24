import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { User_Feed_API } from '../APIS/userAPIS';

const Feed = () => {
  const dispatch = useDispatch();
  const [ isFetching, setIsFetching ] = useState(false)

  const feedList = useSelector((store) => store.feed);

  const fetchFeedUsers = async() => {
    if(isFetching) return;
    setIsFetching(true)
    const data = await User_Feed_API({dispatch});
    if (!data || data.length === 0) {
      setTimeout(() => {
        setIsFetching(false);
        fetchFeedUsers(); 
      }, 30000);
    } else {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (!feedList || feedList.length < 1){
      fetchFeedUsers();
    }
  }, [feedList]);

  if (!feedList) return;
  if (feedList.length <= 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-7.78rem)] bg-gradient-to-br from-blue-400 to-purple-300 p-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center bg-black/40 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg">
          No Users Available
        </h1>
      </div>
    );
  }

  return (
    feedList && (
      <div className="flex justify-center items-center h-[calc(100vh-7.78rem)] bg-gradient-to-br from-blue-400 to-purple-300 p-4">
        <UserCard
          user={feedList[0]}
          isFromProfile={false}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg"
        />
      </div>
    )
  );
}

export default Feed