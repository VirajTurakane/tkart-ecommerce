import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAddToWishlistRoute,
  fetchRemoveFromWishlistRoute,
  fetchWishlistRoute,
} from "./api";

export const fetchWishlist = createAsyncThunk("fetch/wishlist", async () => {
  const res = await fetchWishlistRoute();
  return res;
});

export const addToWishlist = createAsyncThunk(
  "add/wishlist",
  async (productId) => {
    const res = fetchAddToWishlistRoute(productId);
    return res;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "remove/wishlist",
  async (productId) => {
    const res = await fetchRemoveFromWishlistRoute(productId);
    return res;
  }
);
