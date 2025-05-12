import express from "express";
import { login, signup } from "../controllers/user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is my ropute test");
});

// Authentication
router.post("/signup", signup);
router.post("/login", login);

export { router };
