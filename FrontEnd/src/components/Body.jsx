import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { Fetch_User_Profile_API } from '../apis/profileAPIS';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const showDevLink = location.pathname === "/"
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
    <div className="flex flex-col h-screen overflow-auto relative">
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <main className="flex-grow overflow-auto">
        {showDevLink ? (
          <div className="absolute inset-0 z-10">
            <div className="relative w-full h-full">
              <button
                onClick={() => {
                  userInRedux ? navigate("/feed") : navigate("/signin");
                }}
                className="animate-bubble-screen absolute text-4xl sm:text-5xl md:text-6xl font-extrabold  text-white bg-gradient-to-r from-blue-500 to-purple-500 px-6 sm:px-8 md:px-10 py-3 sm:py-5 md:py-6 rounded-full shadow-2xl hover:scale-110 hover:shadow-blue-500/50 transition-transform duration-300 border-4 border-white backdrop-blur-xl max-w-[90vw] sm:max-w-[300px] md:max-w-[350px]"
                style={{ pointerEvents: "auto" }}
              >
                Dev<span className="text-yellow-300">Link</span>
              </button>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Body