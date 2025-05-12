import express from "express";
import { fetchProducts } from "../controllers/product.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(verifyToken);
router.get("/products", fetchProducts);

export { router };
