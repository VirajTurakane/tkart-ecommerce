import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/helpers/response.js";
import {
  unauthorized,
  invalidToken,
} from "../utils/constants/textConstants.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return errorResponse(res, 401, unauthorized);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return errorResponse(res, 401, invalidToken);
      }

      next();
    });
  } catch (error) {
    console.error("JWT Verify Error:", error);
  }
};
