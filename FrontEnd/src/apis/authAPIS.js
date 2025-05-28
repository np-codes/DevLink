import { BASE_URL } from "../utils/constants";
import { addUser, removeUser} from "../utils//userSlice";
import axios from "axios";
import { persistor } from '../utils//appStore';
import toast from "react-hot-toast";
import { resetAllLinkLists } from "../utils//linkSlice";
import { removeFeed } from "../utils//feedSlice";

export const Sign_In_API = async({signinInfo, dispatch, navigate, setErrorMessage}) => {
	try{
      const res = await axios.post(BASE_URL + "/signin", 
        signinInfo,
        { withCredentials : true }
      )
      const data = res?.data?.data;
      dispatch(addUser(data));
		  toast.success(res.data.message)
      return navigate("/feed");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something Went Wrong.");
      throw new Error( "Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
    }
}

export const Logout_API = async ({dispatch}) => {
	try {
		dispatch(removeUser());
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
         	withCredentials: true,
        }
      );
      persistor.purge();
      dispatch(resetAllLinkLists());
      dispatch(removeUser());
      dispatch(removeFeed());
		toast.success(res.data.message)
    } catch (err) {
      throw new Error("Something Went Wrong : " + err.message);
    }
}

export const Sign_Up_API = async({signupInfo, dispatch, navigate, setErrorMessage}) => {
  try{
    const res = await axios.post(BASE_URL + "/signup", 
      signupInfo , 
      { withCredentials : true }
    )
    const data = res?.data?.data;
    dispatch(addUser(data));
    toast.success(res.data.message);
    return navigate("/profile");
  } catch (err) {
    setErrorMessage(err?.response?.data?.message || "Something Went Wrong.");
    throw new Error( "Error Occured : ", err?.response?.data?.message || "Something Went Wrong.");
  }
}

