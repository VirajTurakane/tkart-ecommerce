import mongoose from "mongoose";

const product = mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    imageURLs: [
      {
        type: String,
        trim: true,
      },
    ],
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    raters: {
      type: Number,
      default: 0,
    },
    variants: [
      {
        colorName: { type: String, trim: true },
        thumbnail: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true, },
);

const Product = mongoose.model("products", product);

export { Product };
