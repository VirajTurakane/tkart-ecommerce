import express from "express";
import { login, signup, isLogin } from "../controllers/user.js";

const router = express.Router();

// Authentication
router.post("/signup", signup);
router.post("/login", login);

// Auth check
router.get("/isLogin", isLogin);

export { router };
