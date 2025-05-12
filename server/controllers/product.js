import { Product } from "../models/productModel.js";
import { errorResponse } from "../utils/response.js";

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

export { fetchProducts };
