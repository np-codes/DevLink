import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Logout_API } from '../APIS/authAPIS';

const NavBar = () => {
  const user = useSelector((store) => store.user )
  const dispatch = useDispatch()
  const location = useLocation();
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const getPageTitle = (pathname) => {
    if (pathname.startsWith("/feed")) return "Feed";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/mylinks")) return "MyLinks";
    return;
  }
  const handleLogout = async() => {
    Logout_API({dispatch})
  }
  const title = getPageTitle(location.pathname)
  return (
    <div className="navbar h-15 bg-base-300 shadow-sm relative flex flex-wrap items-center justify-between px-4 py-2">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl whitespace-nowrap">DevLink</a>
      </div>

      {title && (
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          <p className="text-2xl border py-1 px-2 font-semibold">{title}</p>
        </div>
      )}

      <div className="flex items-center gap-2 ml-auto relative">
        {user && (
          <div className="flex items-center gap-x-3">
            {!dropDownOpen ? (
              <p className="text-base font-medium hidden sm:block">
                Welcome, {user.firstName}
              </p>
            ) : (
              <ul className="absolute right-0 top-full mt-2 bg-base-200 border rounded-md shadow-lg w-40 flex flex-col gap-1 p-2 z-50">
                <li>
                  <Link
                    to="/mylinks"
                    className="block px-3 py-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 transition-all duration-200 rounded"
                    onClick={() => setDropDownOpen(false)}
                  >
                    MyLinks
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin"
                    className="block px-3 py-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 transition-all duration-200 rounded"
                    onClick={() => {
                      setDropDownOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block px-3 py-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 transition-all duration-200 rounded"
                    onClick={() => setDropDownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feed"
                    className="block px-3 py-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-purple-500 transition-all duration-200 rounded"
                    onClick={() => setDropDownOpen(false)}
                  >
                    Feed
                  </Link>
                </li>
              </ul>
            )}
            <button
              type="button"
              className="btn btn-ghost btn-circle avatar p-0"
              onClick={() => setDropDownOpen(!dropDownOpen)}
              aria-haspopup="true"
              aria-expanded={dropDownOpen}
              aria-label="Toggle user menu"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img alt="userPhoto" src={user.photoUrl} />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar