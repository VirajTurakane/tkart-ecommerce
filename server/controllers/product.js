import { Product } from "../models/productModel.js";
import { errorResponse } from "../utils/response.js";
import {
  uploadFile,
  uploadMultipleFiles,
} from "../services/cloudinaryServices.js";
import { productZodSchema } from "../schemas/product.js";

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return errorResponse(res, 500, "Something is up with our server.");
  }
};

const addProduct = async (req, res) => {
  const thumbnail = req.files?.["thumbnail"]?.[0];
  const images = req.files?.["images"];
  let imageURLs;

  console.log("req.files :", req.files);
  console.log("req.body:", req.body);

  const body = productZodSchema.safeParse(req.body);

  if (!body.success) {
    return errorResponse(res, 400, "Invalid Data.");
  }

  const data = body.data;

  // const data = req.body;

  if (!thumbnail) {
    return errorResponse(res, 400, "Thumbnail file not uploaded.");
  }

  const url = await uploadFile(thumbnail.path);

  if (images?.length > 0) {
    const paths = images.map((image) => image.path);
    imageURLs = await uploadMultipleFiles(paths);
  }

  const product = new Product({
    thumbnail: url,
    imageURLs: imageURLs ?? [],
    name: data.name,
    description: data.description ?? "",
    stock: data.stock,
    price: data.price,
    discount: data.discount ?? 0,
    variants: data.variants ?? [],
  });

  const savedProduct = await product.save();

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    product: savedProduct,
  });
};

export { fetchProducts, addProduct };
