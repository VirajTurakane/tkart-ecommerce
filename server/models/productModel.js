import mongoose from "mongoose";

const product = mongoose.Schema({
  thumbnail: String,
  imageURLs: Array,
  name: String,
  description: String,
  createdAt: Date,
  stock: Number,
  price: Number,
  discount: Number,
  totalRating: Number,
  raters: Number,
  color: Object,
});

const Product = mongoose.model("products", product);

export { Product };
