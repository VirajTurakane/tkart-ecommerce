import { User } from "../models/user.js";
import { loginZodSchema, signupZodSchema } from "../schemas/user.js";
import argon2 from "argon2";
import jwtGenerate from "../utils/jwt.js";
import isExist from "../utils/isExist.js";

const signup = async (req, res) => {
  try {
    const body = signupZodSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data.",
      });
    }

    const data = body.data;

    const name = data.name;
    const email = data.email;
    const password = await argon2.hash(data.password);

    const exist = await isExist(email);

    if (exist) {
      return res.status(409).json({
        success: false,
        message: "User aalready exists",
      });
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    await user.save();

    const token = jwtGenerate({ name, email });

    res.cookie(process.env.JWT_NAME, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something is up with our sever",
    });
  }
};

const login = async (req, res) => {
  try {
    const body = loginZodSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data.",
      });
    }

    const data = body.data;

    const email = data.email;

    const exist = await isExist(email);

    if (!exist) {
      return res.status(404).json({
        success: false,
        message: "User does not exist, please signup first.",
      });
    }

    const user = await User.findOne({ email: email });

    const password = data.password;

    const verify = await argon2.verify(user.password, password);

    if (!verify) {
      return res.status(401).json({
        success: false,
        message: "Wrong password.",
      });
    }

    const name = user.name;

    const token = jwtGenerate({ name, email });

    res.cookie(process.env.JWT_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 30 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successfully.",
      user: {
        name: user.name,
        email: email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something is up with our sever",
    });
  }
};

export { signup, login };
