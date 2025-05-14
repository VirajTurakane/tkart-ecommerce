import { loginZodSchema, signupZodSchema } from "../schemas/user.js";
import argon2 from "argon2";
import jwtGenerate from "../utils/jwt.js";
import findUserByEmail from "../utils/findUser.js";
import { errorResponse } from "../utils/response.js";
import { createUser } from "../services/userServices.js";
import {
  serverError,
  invalidData,
  profileCreated,
  loginSuccess,
  wrongPassword,
  userNotExist,
  userExists,
} from "../utils/constants/textConstants.js";
import { setTokenCookie } from "../utils/helpers/setTokenCookie.js";

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

    await createUser(data);

    const token = jwtGenerate({ name, email });

    setTokenCookie(token);

    return res.status(201).json({
      success: true,
      message: profileCreated,
      user: {
        name: name,
        email: email,
      },
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

    setTokenCookie(token);

    return res.status(200).json({
      success: true,
      message: loginSuccess,
      user: {
        name: name,
        email: email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return errorResponse(res, 500, serverError);
  }
};

export { signup, login };
