import { loginZodSchema, signupZodSchema } from "../schemas/user.js";
import argon2 from "argon2";
import jwtGenerate from "../utils/helpers/jwt.js";
import findUserByEmail from "../utils/helpers/findUser.js";
import { errorResponse } from "../utils/helpers/response.js";
import { createUser } from "../services/userServices.js";
import {
  serverError,
  invalidData,
  profileCreated,
  loginSuccess,
  wrongPassword,
  userNotExist,
  userExists,
  invalidToken,
} from "../utils/constants/textConstants.js";
import { setTokenCookie, setUserCookie } from "../utils/helpers/setCookies.js";

const signup = async (req, res) => {
  try {
    const body = signupZodSchema.safeParse(req.body);

    if (!body.success) {
      return errorResponse(res, 400, invalidData);
    }

    const data = body.data;

    const name = data.fname;
    const email = data.email;

    const user = await findUserByEmail(email);

    if (user) {
      return errorResponse(res, 409, userExists);
    }

    const newUser = await createUser(data);

    const token = jwtGenerate({ name, email });

    setTokenCookie(res, token);

    setUserCookie(res, newUser._id, newUser.email);

    return res.status(201).json({
      success: true,
      message: profileCreated,
      id: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return errorResponse(res, 500, serverError);
  }
};

const login = async (req, res) => {
  try {
    const body = loginZodSchema.safeParse(req.body);

    if (!body.success) {
      return errorResponse(res, 400, invalidData);
    }

    const data = body.data;

    const email = data.email;

    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse(res, 401, userNotExist);
    }

    const password = user.password;

    const verify = await argon2.verify(password, data.password);

    if (!verify) {
      return errorResponse(res, 401, wrongPassword);
    }

    const name = user.fname;

    const token = jwtGenerate({ name, email });

    setTokenCookie(res, token);

    setUserCookie(res, user._id, user.email);

    return res.status(200).json({
      success: true,
      message: loginSuccess,
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return errorResponse(res, 500, serverError);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.clearCookie("id", { path: "/" });
    res.clearCookie("email", { path: "/" });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      id: null,
      email: null,
    });
  } catch (error) {
    console.error("Logout Error :", error);
    return errorResponse(res, 500, "Something went wrong.");
  }
};

const isLogin = (req, res) => {
  try {
    const token = req.cookies.token;
    const id = req.cookies.id;
    const email = req.cookies.email;

    if (!token && !id && !email)
      return res.status(200).json({
        success: false,
        msg: "User is not logged in.",
      });

    return res.status(200).json({
      success: true,
      id: id,
      email: email,
    });
  } catch (error) {
    console.error("Is Login Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

export { signup, login, isLogin, logout };
