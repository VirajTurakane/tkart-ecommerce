import { url } from "../../constants/textConstants.js";
import axios from "axios";

export const fetchWishlistRoute = async () => {
  try {
    const res = await axios.get(url + "wishlist", {
      withCredentials: true,
    });
    const wishlist = res.data.wishlist;

    return await productThrower(wishlist);
  } catch (error) {
    console.error("wishlist/api/fetchWishlistRoute Error :", error);
  }
};

export const fetchAddToWishlistRoute = async (productId) => {
  try {
    const res = await axios.post(
      url + "wishlist/add",
      {
        productId,
      },
      {
        withCredentials: true,
      }
    );

    const wishlist = res.data.wishlist.wishlist;

    return await productThrower(wishlist);
  } catch (error) {
    console.error("wishlist/api/addToWishlistRoute Error :", error);
  }
};

export const fetchRemoveFromWishlistRoute = async (productId) => {
  try {
    const res = await axios.delete(url + "wishlist/remove", {
      data: { productId },
      withCredentials: true,
    });

    const wishlist = res.data.wishlist.wishlist;

    return await productThrower(wishlist);
  } catch (error) {
    console.error("wishlist/api/removeFromWishlistRoute Error :", error);
  }
};

// Helper Fuction to return list products by each product id
const productThrower = async (wishlist) => {
  const products = await Promise.all(
    wishlist.map((product) => axios.get(url + `product/${product.productId}`))
  );

  return products.map((res) => res.data);
};
