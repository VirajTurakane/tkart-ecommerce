import express from "express";
import { addProduct, fetchProducts } from "../controllers/product.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/fileUpload.js";

const router = express.Router();

router.use(verifyToken);
router.get("/products", fetchProducts);
router.post(
  "/add",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  addProduct
);

export { router };
