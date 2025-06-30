export const isAddedToWishlist = (wishlist, product) => {
  return wishlist?.some((element) => element.product._id === product._id);
};
