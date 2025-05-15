import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "./feedSlice";
import { addConnections } from "./linkSlice";

export const User_Feed_API = async ({dispatch}) => {
    try{
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials : true
      });
      const data = res.data?.data;
      dispatch(addFeed(data));
   	} catch (err) {
      throw new Error("Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
   	}
}

export const User_Connections_API = async({dispatch}) => {
    try{
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials : true
      });
			const data = res.data?.data;
      dispatch(addConnections(data))
    }
    catch (err) {
      throw new Error("Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
   }
}