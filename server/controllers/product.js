import { Product } from "../models/productModel.js";
import { errorResponse } from "../utils/constants/response.js";
import {
  uploadFile,
  uploadMultipleFiles,
} from "../services/cloudinaryServices.js";
import { productZodSchema } from "../schemas/product.js";
import {
  serverError,
  invalidData,
  thumbnailError,
  productCreated,
} from "../utils/constants/textConstants.js";

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return errorResponse(res, 500, serverError);
  }
};

const addProduct = async (req, res) => {
  try {
    const thumbnail = req.files?.["thumbnail"]?.[0];
    const images = req.files?.["images"];
    let imageURLs;

    const body = productZodSchema.safeParse(req.body);

    if (!body.success) {
      return errorResponse(res, 400, invalidData);
    }

    const data = body.data;

    if (!thumbnail) {
      return errorResponse(res, 400, thumbnailError);
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
      message: productCreated,
      product: savedProduct,
    });
  } catch (error) {
    console.error("Add Product Error :", error);
    errorResponse(res, 500, serverError);
  }
};

const updateProduct = async (req, res) => {
  try {
    const body = productZodSchema.safeParse(req.body);

    if (!body.success) {
      return errorResponse(res, 400, invalidData);
    }

    const data = body.data;

    if (!updatedProduct) {
      return errorResponse(res, 404, "Product not found.");
    }

    const updatedProduct = findByIdAndUpdate({ _id: data._id }, {});
  } catch (error) {
    console.error("Update Product :", error);
    errorResponse(res, 500, serverError);
  }
};

export { fetchProducts, addProduct };
