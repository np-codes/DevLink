import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout_API } from '../utils/apis';

const NavBar = () => {
  const user = useSelector((store) => store.user )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async() => {
    Logout_API({dispatch, navigate })
    
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevLink</a>
      </div>
      <div className="flex gap-2 mr-5">
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-x-3">
              <p className="text-base font-medium">Welcome, {user.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="userPhoto" src={user.photoUrl} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-200 rounded-box z-1 mt-3 w-20 p-2 shadow text-black font-bold"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar