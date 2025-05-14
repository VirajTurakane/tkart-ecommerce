import { User } from "../../models/user.js";

export default async function findUserByEmail(email) {
  const exist = await User.findOne({ email: email });

  return exist;
}











































