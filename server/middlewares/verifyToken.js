import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return errorResponse(res, 401, "Unauthorized.");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return errorResponse(res, 401, "Token is invalid or expired.");
      }

      next();
    });
  } catch (error) {
    console.error("JWT Verify Error:", error);
  }
};
