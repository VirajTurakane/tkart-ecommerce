import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addWishlist,
  removeFromWishlist,
  wishlist,
  wishlistById,
} from "../controllers/wishlist.js";

const router = express.Router();

router.use(verifyToken);

router.get("/wishlist", wishlist);
router.get("/wishlist/:productId", wishlistById);
router.post("/wishlist/add", addWishlist);
router.delete("/wishlist/remove", removeFromWishlist);

export { router };
