import axios from "axios";
import { url } from "../../constants/textConstants.js";

export const fetchProductsRoute = async () => {
  const res = await axios.get(url + "products");
  return res.data;
};

export const fetchProductByIdRoute = async (id) => {
  const res = await axios.get(url + `product/${id}`);
  return res.data;
};
