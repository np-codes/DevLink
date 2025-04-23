import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feedList = useSelector((store) => store.feed);
  
  const feedUserAPI = async() => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials : true
      });
      const data = res.data?.data
      dispatch(addFeed(data))

    } catch (err) {
      throw new Error("Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
    }
  }
  useEffect(() => {
    if (!feedList){
      feedUserAPI();
    }
  }, []);

  return (
    feedList && (
      <div className="flex justify-center items-center h-[calc(100vh-8.3rem)] bg-gradient-to-br from-blue-400 to-purple-300 px-4">
        {<UserCard user = { feedList[2] }/>}
      </div>
    )
  );
}

export default Feed