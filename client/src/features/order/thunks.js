import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderRoute, fetchOrdersRoute } from "./api";

export const order = createAsyncThunk(
  "fetch/order",
  async ({ id, quantity }) => {
    const res = await fetchOrderRoute({ id, quantity });
    return res;
  }
);

export const allOrders = createAsyncThunk("fetch/orders", async () => {
  const res = await fetchOrdersRoute();
  return res;
});
