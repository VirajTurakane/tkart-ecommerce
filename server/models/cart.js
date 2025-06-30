import mongoose from "mongoose";

const cart = mongoose.Schema({
  products: [
    {
      type: String,
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
  userId: {
    type: String,
    require: true,
  },
});

const Cart = mongoose.model("carts", cart);

export { Cart };
