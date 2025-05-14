export const setTokenCookie = (token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000 * 28,
  });
};
