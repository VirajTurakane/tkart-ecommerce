import { createSelector } from "@reduxjs/toolkit";

const selectWishlistState = (state) => state.wishlist;

export const selectWishlist = createSelector(
  [selectWishlistState],
  (wishlist) => wishlist.wishlist
);

export const selectWishlistLoading = createSelector(
  [selectWishlistState],
  (wishlist) => wishlist.loading
);
