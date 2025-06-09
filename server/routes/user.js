import express from "express";
import { login, signup, isLogin, logout } from "../controllers/user.js";

const router = express.Router();

// Authentication
router.post("/signup", signup);
router.post("/login", login);

// Auth check
router.get("/isLogin", isLogin);
router.get("/logout", logout);

export { router };
