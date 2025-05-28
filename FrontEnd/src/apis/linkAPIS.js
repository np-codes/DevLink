import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { popRequestFromList, pushNewConnectionToList } from '../utils/linkSlice';
import { popUserFromFeed } from "../utils/feedSlice";

export const Action_On_Received_Request_API = async (status,friend,dispatch) => {
    try{
      const requestid = friend?.linkId;
      const res = await axios.post(BASE_URL + `/request/receive/${status}/${requestid}`, {}, {
        withCredentials : true
      }); 
      dispatch(popRequestFromList(requestid));
      if(status === "accepted"){
        dispatch(pushNewConnectionToList(friend))
      }
      toast.success(res.data.message)
   	} catch (err) {
      throw new Error("Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
   	}
}

export const Send_Connection_Request_API = async (status,userid, dispatch) => {
    try{
      const res = await axios.post(BASE_URL + `/request/send/${status}/${userid}`, {}, {
        withCredentials : true
      });
      dispatch(popUserFromFeed(userid))
   	} catch (err) {
      throw new Error("Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
   	}
}