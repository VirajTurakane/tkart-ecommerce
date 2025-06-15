import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "./thunks.js";

const initialState = {
  product: null,
  loading: false,
  error: null,
  singleProduct: null,
  singleProductLoading: false
};

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

    builder.addCase(fetchProductById.pending, (state) => {
      state.singleProductLoading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.singleProductLoading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.singleProductLoading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
