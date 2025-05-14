import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { User_Feed_API } from '../utils/userAPIS';

const Feed = () => {
  const dispatch = useDispatch();
  const feedList = useSelector((store) => store.feed);
  
  const feedUserAPI = async() => {
    User_Feed_API({dispatch})
  }
  useEffect(() => {
    if (!feedList){
      feedUserAPI();
    }
  }, []);

  return (
    feedList && (
      <div className="flex justify-center items-center h-[calc(100vh-8.3rem)] bg-gradient-to-br from-blue-400 to-purple-300 p-4">
        {<UserCard user = { feedList[2] }/>}
      </div>
    )
  );
}

export default Feed