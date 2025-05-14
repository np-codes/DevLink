import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Logout_API } from '../utils/authAPIS';

const NavBar = () => {
  const user = useSelector((store) => store.user )
  const dispatch = useDispatch()
  const location = useLocation();
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const getPageTitle = (pathname) => {
    if (pathname.startsWith("/feed")) return "Feed";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/connections")) return "Connections";
    return;
  }
  const handleLogout = async() => {
    Logout_API({dispatch})
    
  }
  const title = getPageTitle(location.pathname)
  return (
    <div className="navbar bg-base-300 shadow-sm relative">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevLink</a>
      </div>
      {title && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-2xl border py-1 px-2 font-semibold">{title}</p>
        </div>
      )}
      <div className="flex gap-2 mr-5">
        {user && (
          <div className="">
            <div className="flex items-center gap-x-3">
              {!dropDownOpen ? (
                <p className="text-base font-medium">
                  Welcome, {user.firstName}
                </p>
              ) : (
                <div className="flex items-center gap-x-3 px-3 ">
                  <li>
                    <Link
                      to="/connections"
                      className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 transition-all duration-200"
                      onClick={() => setDropDownOpen(false)}
                    >
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => {
                        setDropDownOpen(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" onClick={() => setDropDownOpen(false)}>
                      Profile
                    </Link>
                  </li>
                </div>
              )}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setDropDownOpen(!dropDownOpen)}
              >
                <div className="w-10 rounded-full">
                  <img alt="userPhoto" src={user.photoUrl} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar