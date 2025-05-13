import express from "express";
import { addProduct, fetchProducts } from "../controllers/product.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(verifyToken);
router.get("/products", fetchProducts);
router.post("/add", addProduct);

export { router };
