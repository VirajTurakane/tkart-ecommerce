import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { orderProducts } from "../controllers/order.js";

const router = express.Router();

router.use(verifyToken);

router.post("/order", orderProducts);

export { router };