import { loginZodSchema, signupZodSchema } from "../schemas/user.js";
import argon2 from "argon2";
import jwtGenerate from "../utils/jwt.js";
import findUserByEmail from "../utils/findUser.js";
import { errorResponse } from "../utils/response.js";
import { createUser } from "../services/userServices.js";

const signup = async (req, res) => {
  try {
    const body = signupZodSchema.safeParse(req.body);

    if (!body.success) {
      return errorResponse(res, 400, "Invalid data.");
    }

    const data = body.data;

    const name = data.name;
    const email = data.email;
    const password = data.password;

    const user = await findUserByEmail(email);

    if (user) {
      return errorResponse(res, 409, "User already exists.");
    }

    await createUser({ name, email, password });

    const token = jwtGenerate({ name, email });

    res.cookie(process.env.JWT_NAME, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: (24 * 60 * 60 * 1000) * 28,
    });

    return res.status(200).json({
      success: true,
      message: "Profile created successfully.",
      user: {
        name: name,
        email: email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return errorResponse(res, 500, "Something is up with our sever.");
  }
};

const login = async (req, res) => {
  try {
    const body = loginZodSchema.safeParse(req.body);

    if (!body.success) {
      return errorResponse(res, 400, "Invalid data.");
    }

    const data = body.data;

    const email = data.email;

    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse(
        res,
        401,
        "User does not exist, please signup first."
      );
    }

    const password = user.password;

    const verify = await argon2.verify(password, data.password);

    if (!verify) {
      return errorResponse(res, 401, "Wrong password.");
    }

    const name = user.name;

    const token = jwtGenerate({ name, email });

    res.cookie(process.env.JWT_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: (24 * 60 * 60 * 1000) * 28,
    });

    return res.status(200).json({
      success: true, 
      message: "Login successfully.",
      user: {
        name: name,
        email: email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return errorResponse(res, 500, "Something is up with our sever.");
  }
};

export { signup, login };
