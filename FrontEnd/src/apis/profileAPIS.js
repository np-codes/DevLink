import { BASE_URL } from "../utils/constants";
import { addUser, updateUser } from "../utils/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

export const Edit_Profile_API = async({
  data,
  dispatch,
  setErrorMessage,
  resetFields,
  flipBack
}) => {
   try {
		const res = await axios.patch(BASE_URL + "/profile/edit",
         data,
         { withCredentials: true }
      );
		dispatch(updateUser(data));
		resetFields();
      flipBack();	
		toast.success(res.data.message)
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


