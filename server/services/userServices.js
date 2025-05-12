import argon2 from "argon2";
import { User } from "../models/user.js";

export const createUser = async (data) => {
  const hashed = await argon2.hash(data.password);

  const user = new User({
    fname: data.fname,
    lname: data.lname,
    phone: data.phone,
    email: data.email,
    password: hashed,
    address: data.address,
  });

  return await user.save();
};
