import exprees from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addToCart, fetchCart, removeFromCart } from "../controllers/cart.js";

const router = exprees.Router();

router.use(verifyToken);

router.post("/cart/add", addToCart);
router.delete("/cart/remove", removeFromCart);
router.get("/cart", fetchCart);

export { router };
