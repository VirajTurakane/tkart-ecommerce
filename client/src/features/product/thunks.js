import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductByIdRoute, fetchProductsRoute } from "./api";

export const fetchProducts = createAsyncThunk("/fetch/products", async () => {
  const res = await fetchProductsRoute();
  return res;
});

export const fetchProductById = createAsyncThunk(
  "/fetch/product",
  async (id) => {
    const res = await fetchProductByIdRoute(id);
    return res.product;
  }
);
