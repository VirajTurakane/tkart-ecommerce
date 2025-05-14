import { Product } from "../models/productModel.js";
import { errorResponse } from "../utils/helpers/response.js";
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
  productNotFound,
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
    const thumbnail = req.files["thumbnail"]?.[0] ?? "";
    const images = req.files["images"] ?? [];
    let imageURLs;

    let url;

    if (!body.success) {
      return errorResponse(res, 400, invalidData);
    }

    const data = body.data;

    if (thumbnail) {
      url = (await uploadFile(thumbnail.path)) ?? null;
    }

    if (images && images?.length > 0) {
      const paths = images.map((image) => image.path);
      imageURLs = await uploadMultipleFiles(paths);
    }

    const initialProduct = await Product.findById(data.id);

    if (!initialProduct) {
      return errorResponse(res, 404, productNotFound);
    }

    const newProduct = {
      thumbnail: url ?? initialProduct.thumbnail,
      imageURLs: imageURLs ?? initialProduct.imageURLs,
      name: data.name ?? initialProduct.name,
      description: data.description ?? initialProduct.description,
      stock: data.stock ?? initialProduct.stock,
      price: data.price ?? initialProduct.price,
      discount: data.discount ?? initialProduct.discount,
      variants: data.variants ?? initialProduct.variants,
    };
    const updatedProduct = await Product.findByIdAndUpdate(
      data.id,
      newProduct,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated.",
      updatedProduct,
    });
  } catch (error) {
    console.error("Update Product :", error);
    errorResponse(res, 500, serverError);
  }
};

export { fetchProducts, addProduct, updateProduct };
