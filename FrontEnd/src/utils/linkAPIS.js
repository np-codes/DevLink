import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

export const Action_On_Received_Request_API = async (status,requestid) => {
    try{
      const res = await axios.post(BASE_URL + `/request/receive/${status}/${requestid}`, {}, {
        withCredentials : true
      }); 
      toast.success(res.data.message)
   	} catch (err) {
      throw new Error("Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
   	}
}

export const Send_Connection_Request_API = async (status,requestid) => {
    try{
      const res = await axios.post(BASE_URL + `/request/send/${status}/${requestid}`, {}, {
        withCredentials : true
      });
      console.log(res)
   	} catch (err) {
      throw new Error("Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
   	}
}