import argon2 from "argon2";
import { User } from "../models/user.js";

export const createUser = async ({ email, name, password }) => {
  const hashed = await argon2.hash(password);

  const user = new User({
    name: name,
    email: email,
    password: hashed,
  });

  return await user.save();
};
