import mongoose from "mongoose";

const cart = mongoose.Schema({
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Cart = mongoose.model("carts", cart);

export { Cart };
