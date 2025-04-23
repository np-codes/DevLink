import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const inputcss =
    "p-4 m-3 w-10/12 rounded-md text-black font-bold text-lg bg-gray-400 placeholder-black placeholder-opacity-70 transition-all duration-300 ease-in-out hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none";

  const buttoncss =
    "p-1.5 m-3 mt-4 w-6/12 bg-gray-400 text-black font-semibold text-xl rounded-md transition-all duration-500 hover:scale-105 hover:ring-2 hover:ring-purple-500 hover:ring-opacity-50 hover:bg-indigo-300";

  const cardcss =
    "card card-border rounded-2xl bg-base-100 w-96 justify-self-center transition-all duration-500 hover:scale-103 hover:ring-2 hover:ring-purple-500 hover:ring-opacity-10 focus-within:scale-105 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-50";

  const [ emailId, setEmailId ] = useState("Zeel@gmail.com");
  const [ password, setPassword ] = useState("Zeel@123");
  const [ error, setError ] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try{
      const res = await axios.post(BASE_URL + "/login", 
        { emailId, password },
        { withCredentials : true }
      )
      const data = res?.data?.data;
      dispatch(addUser(data))
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Something Went Wrong.");
      throw new Error( "Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
    }
  }

  return (
    <div className=" flex justify-center items-center h-[calc(100vh-8.3rem)] overflow-hidden">
      <div className=" flex items-center justify-center h-screen ">
        <div className={cardcss}>
          <h2 className="p-2 my-3 text-gray-300 text-5xl font-bold text-center">
            Login
          </h2>
          <div className="flex flex-col items-center">
            <input 
              type="email" 
              value = {emailId}
              className={inputcss} 
              placeholder="Email"
              onChange={(e) => setEmailId(e.target.value)} 
            />
            <input
              type="password"
              value = {password}
              className={inputcss}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='text-red-500 mt-1'>{error}</p>
            <button className={buttoncss} onClick={handleLogin}>Login</button>
            <h2 className="mb-8 p-1 text-white">
              Dont Have An Acoount? Create New Account
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;