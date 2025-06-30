import { createSlice } from "@reduxjs/toolkit";
import { allOrders, order } from "./thunks";

const initialState = {
  orders: null,
  order: null,
  loading: false,
  error: null,
  quantity: 1,
};

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    increment: (state) => {
      state.quantity += 1;
    },
    decrement: (state) => {
      state.quantity -= 1;
    },
  },
  extraReducers: (builder) => {
    // Order
    builder.addCase(order.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(order.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(order.rejected, (state) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Orders
    builder.addCase(allOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(allOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(allOrders.rejected, (state) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { increment, decrement } = orderSlice.actions;

export default orderSlice.reducer;
