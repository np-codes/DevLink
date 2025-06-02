import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';


const NavBar = () => {
  const user = useSelector((store) => store.user )
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.startsWith("/feed")) return "Feed";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/mylinks")) return "MyLinks";
    return;
  }
  
  const title = getPageTitle(location.pathname)
  return (
    <div className="navbar h-15 bg-base-300 shadow-sm relative flex flex-wrap items-center justify-between px-4 py-2">
      {user ? (
        <Link to="/feed" className="flex-1">
          <div className="btn btn-ghost text-xl whitespace-nowrap">DevLink</div>
        </Link>
      ) : (
        <div className="flex-1">
          <div className="btn btn-ghost text-xl whitespace-nowrap">DevLink</div>
        </div>
      )}

      {title && (
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          <p className="text-2xl border py-1 px-2 font-semibold">{title}</p>
        </div>
      )}

      <div className="flex items-center gap-2 ml-auto relative">
        {user && (
          <div className="flex items-center gap-x-3">
            <p className="text-base font-medium hidden sm:block">
              Welcome, {user.firstName}
            </p>
            <Link to="/profile" className="flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400 shadow-md">
                <img
                  src={user.photoUrl}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar