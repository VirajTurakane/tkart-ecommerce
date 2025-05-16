import axios from "axios";

const url = "http://localhost:3000/api/v1/";

export const fetchAuthRoute = async () => {
  const res = await axios.get(url + "isLogin", {
    withCredentials: true,
  });

  return res.data;
};

export const postLoginRoute = async ({email, password}) => {
  const res = await axios.post(
    url + "login",
    { email, password },
    { withCredentials: true }
  );

  return res.data;
};
