import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  cancelOrder,
  fetchOrders,
  orderProducts,
  returnProduct,
} from "../controllers/order.js";

const router = express.Router();

router.use(verifyToken);

router.get("/orders", fetchOrders);
router.post("/order", orderProducts);
router.put("/order/return", returnProduct);
router.put("/order/cancel", cancelOrder);

export { router };
