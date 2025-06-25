import axios from "axios"
import { BASE_URL } from "../utils/constants"

export const Fetch_Chats_List = async(userId) => {
    try{
        const res = await axios.get(
            BASE_URL + `/chats/${userId}`, 
            { withCredentials : true }
        );
        const data = res?.data?.data;
        return data;
    } catch (err) {
      throw new Error("Something Went Wrong : " + err.message);
    }
}