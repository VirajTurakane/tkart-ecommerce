import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Important for login/signup
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Refers to a product model
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Refers to an order model
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
