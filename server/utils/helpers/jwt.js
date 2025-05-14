import jwt from "jsonwebtoken";

export default function jwtGenerate({ name, email }) {
  const token = jwt.sign(
    {
      name,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "28d",
    }
  );

  return token;
}
