import { BASE_URL } from "../utils/constants";
import { addUser, removeUser, updateUser } from "./userSlice";
import axios, { AxiosError } from "axios";
import { persistor } from '../utils/appStore';
import { addFeed } from "./feedSlice";

export const Edit_Profile_API = async({
  data,
  dispatch,
  setErrorMessage,
  resetFields,
  flipBack
}) => {
   try {
		const respond = await axios.patch(BASE_URL + "/profile/edit",
         data,
         { withCredentials: true }
      );
		dispatch(updateUser(data));
		resetFields();
      flipBack();	
		console.log(respond)
   } catch (err) {
		setErrorMessage(err?.response?.data?.message);
      throw new Error(
         "Error Occured : ", err?.response?.data?.message || "Something Went Wrong."
      );
   }
}

export const Fetch_User_Profile_API = async({dispatch, navigate}) => {
	try{
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials : true
      });
      const data = res?.data?.data
      dispatch(addUser(data))
    } catch (err) {
      if (err.status === 401) {
        navigate("/login")
      }
      throw new Error("Something Went Wrong : " + err.message);
    }
}

export const Login_API = async({loginInfo, dispatch, navigate, setErrorMessage}) => {
	try{
      const res = await axios.post(BASE_URL + "/login", 
        loginInfo,
        { withCredentials : true }
      )
      const data = res?.data?.data;
      dispatch(addUser(data));
      return navigate("/feed");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something Went Wrong.");
      throw new Error( "Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
    }
}

export const Logout_API = async ({dispatch, navigate}) => {
	try {
		dispatch(removeUser());
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
         	withCredentials: true,
        }
      );
      persistor.purge();
      navigate("/login");
    } catch (err) {
      throw new Error("Something Went Wrong : " + err.message);
    }
}

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