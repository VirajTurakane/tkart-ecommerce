import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsRoute } from "./api";

const initialState = {
  product: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("/fetch/products", async () => {
  const res = await fetchProductsRoute();
  return res;
});

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
