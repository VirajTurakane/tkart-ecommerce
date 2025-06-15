import { addToWishlist, fetchWishlist, removeFromWishlist } from "./thunks.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: null,
  loading: false,
  error: null,
  single: null,
  singleLoading: false,
};

const wishlistSlice = createSlice({
  initialState,
  name: "wishlist",
  reducers: {},
  extraReducers: (builder) => {
    //fetch wishlist reducers
    builder.addCase(fetchWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add to wishlist reducers
    builder.addCase(addToWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Remove from wishlist reducers
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default wishlistSlice.reducer;
