import axios from "axios";
import { url } from "../../constants/textConstants.js";

export const fetchProductsRoute = async () => {
  const res = await axios.get(url + "products");
  return res.data;
};
