import axios from "axios";
import { url } from "../../constants/textConstants.js";

export const fetchCartRoute = async () => {
  const res = await axios.get(url + "cart", {
    withCredentials: true,
  });
  const cart = await productThrower(res.data.cart.products);
  return cart;
};

export const fetchAddToCartRoute = async (productId) => {
  const res = await axios.post(
    url + "cart/add",
    { productId },
    { withCredentials: true }
  );
  const cart = await productThrower(res.data.cart.products);
  return cart;
};

export const fetchRemoveFromCartRoute = async (productId) => {
  const res = await axios.delete(url + "cart/remove", {
    withCredentials: true,
    data: {
      productId,
    },
  });
  const cart = await productThrower(res.data.cart.products);
  return cart;
};

// Helper Function
const productThrower = async (cart) => {
  const products = await Promise.all(
    cart.map((product) => axios.get(url + `product/${product}`))
  );
  return products.map((res) => res.data.product);
};
