import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAddToCartRoute,
  fetchCartRoute,
  fetchRemoveFromCartRoute,
} from "./api";

export const fetchCart = createAsyncThunk("fetch/cart", async () => {
  const res = await fetchCartRoute();
  return res;
});

export const addToCart = createAsyncThunk("fetch/add", async (productId) => {
  const res = await fetchAddToCartRoute(productId);
  return res;
});

export const removeFromCart = createAsyncThunk(
  "fetch/remove",
  async (productId) => {
    const res = await fetchRemoveFromCartRoute(productId);
    return res;
  }
);
