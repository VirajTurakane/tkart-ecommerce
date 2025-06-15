import mongoose from "mongoose";

const wishlist = mongoose.Schema({
  wishlist: [
    {
      productId: {
        type: String,
        require: true,
        unique: true,
      },
    },
  ],
  userId: {
    type: String,
    require: true,
  },
});

const Wishlist = mongoose.model("wishlist", wishlist);

export { Wishlist };
