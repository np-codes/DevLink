import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { Fetch_User_Profile_API } from '../apis/profileAPIS'
import { Toaster } from 'react-hot-toast'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInRedux = useSelector(store => store.user);

  const fetchUser = async() => {
    Fetch_User_Profile_API({dispatch, navigate})
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token && !userInRedux){
      fetchUser();
    }
  },[]);

  return (
    <div className="flex flex-col h-screen overflow-auto ">
      <Toaster position='top-center' reverseOrder={false} />
      <NavBar />

      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Body