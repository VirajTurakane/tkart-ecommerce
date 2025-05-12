import { User } from "../models/user.js";

export default async function isExist(email) {
  const exist = await User.findOne({ email: email });

  return exist;
}
