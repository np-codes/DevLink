import { BASE_URL } from "./constants";
import { addUser, removeUser} from "./userSlice";
import axios from "axios";
import { persistor } from './appStore';
import toast from "react-hot-toast";
import { resetAllLinkLists } from "./linkSlice";
import { removeFeed } from "./feedSlice";

export const Login_API = async({loginInfo, dispatch, navigate, setErrorMessage}) => {
	try{
      const res = await axios.post(BASE_URL + "/login", 
        loginInfo,
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
