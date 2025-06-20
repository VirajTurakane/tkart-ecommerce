import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "../controllers/product.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/fileUpload.js";

const router = express.Router();

router.get("/products", fetchProducts);
router.get("/product/:id", fetchProductById);

router.use(verifyToken);

router.post(
  "/add",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  addProduct
);

router.put(
  "/update",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProduct
);

router.delete("/delete", deleteProduct);

export { router };
