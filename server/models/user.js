import mongoose from "mongoose";

const user = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", user);

export { User };
