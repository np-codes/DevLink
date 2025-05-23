import React, { useEffect } from "react";
import LinkLists from './LinkLists';
import { useDispatch } from "react-redux";
import { User_Connections_API, User_Requests_API } from "../apis/userAPIS";

const MyLinks = () => {
  const dispatch = useDispatch()
  const fetchUserLinks = () => {
    User_Connections_API({ dispatch });
    User_Requests_API({ dispatch });
  };

  useEffect(() => {
    fetchUserLinks();
  }, []);
  return (
    <div className="w-full h-full bg-gradient-to-r from-purple-300 via-blue-200 to-green-300 grid grid-cols-2 gap-8 p-6 ">
      <div className="bg-gray-200 rounded-xl p-4 shadow transition-all duration-500 hover:shadow-lg hover: shadow-black hover:scale-102 col-start-1 col-end-2 min-h-[400px] flex flex-col">
        <LinkLists section="connections" />
      </div>
      <div className="bg-gray-200 rounded-xl p-4 shadow transition-all duration-500 hover:shadow-lg hover: shadow-black hover:scale-102 col-start-2 col-end-3 min-h-[400px] flex flex-col">
        <LinkLists section="requests" />
      </div>
    </div>
  );
}

export default MyLinks