import axios from "axios";
import { url } from "../../constants/textConstants.js";

export const fetchAuthRoute = async () => {
  const res = await axios.get(url + "isLogin", {
    withCredentials: true,
  });

  return res.data;
};

export const postLoginRoute = async ({ email, password }) => {
  const res = await axios.post(
    url + "login",
    { email, password },
    { withCredentials: true }
  );

  return res.data;
};

export const postSignupRoute = async (user) => {
  const res = await axios.post(url + "signup", user, { withCredentials: true });

  return res.data;
};

export const getLogutRoute = async () => {
  const res = await axios.get(url + "logout", {
    withCredentials: true,
  });
  return res.data;
};
