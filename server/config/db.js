import mongoose from "mongoose";

export default async function connectDB(url) {
  try {
    await mongoose.connect(url);

    console.log("MongoDB connected.");
  } catch (error) {
    console.log(error);
  }
}
