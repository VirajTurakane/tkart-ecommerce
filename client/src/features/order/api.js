import axios from "axios";
import { url } from "../../constants/textConstants.js";

export const fetchOrderRoute = async ({ id, quantity }) => {
  const res = await axios.post(
    url + "order",
    {
      id,
      quantity,
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const fetchOrdersRoute = async () => {
  const res = await axios.get(url + "orders", { withCredentials: true });
  const data = res.data;

  const product = await productThrower(data.orders);

  return product;
};

// Helper Function
const productThrower = async (orders) => {
  const products = await Promise.all(
    orders.map((product) => axios.get(url + `product/${product.productId}`))
  );
  return products.map((res) => res.data.product);
};
