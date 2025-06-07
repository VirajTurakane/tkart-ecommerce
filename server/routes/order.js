import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { orderProducts, returnProduct } from "../controllers/order.js";

const router = express.Router();

router.use(verifyToken);

router.post("/order", orderProducts);
router.put("/return", returnProduct);

export { router };