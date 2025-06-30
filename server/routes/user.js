import express from "express";
import { login, signup, isLogin, logout, user } from "../controllers/user.js";

const router = express.Router();

// Authentication
router.post("/signup", signup);
router.post("/login", login);

// Auth Check
router.get("/isLogin", isLogin);
router.get("/logout", logout);

// Get User
router.get("/user", user);

export { router };
