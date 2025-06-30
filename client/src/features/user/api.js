import axios from "axios";
import { url } from "../../constants/textConstants.js";

export const fetchUserRoute = async () => {
  const res = await axios.get(url + "user", { withCredentials: true });

  return res.data;
};