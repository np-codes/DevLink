import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInRedux = useSelector(store => store.user);

  const fetchUser = async() => {
    try{
      if (!userInRedux) {return navigate("/login");}
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials : true
      });
      const data = res.data
      dispatch(addUser(data.data))
    } catch (err) {
      if (err.status === 401) {
        navigate("/login")
      }
      throw new Error("Something Went Wrong : " + err.message);
    }
  }
  useEffect(() => {
      fetchUser();
  },[]);

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <NavBar />

      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Body