import { User } from "../../models/user.js";

export default async function findUserByEmail(email) {
  return await User.findOne({ email: email });
}











































