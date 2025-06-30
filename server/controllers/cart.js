import { errorResponse } from "../utils/helpers/response.js";
import { cartNotFound, serverError } from "../utils/constants/textConstants.js";
import { Cart } from "../models/cart.js";

const fetchCart = async (req, res) => {
  try {
    const userId = req.cookies.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return errorResponse(res, 404, cartNotFound);
    } else {
      return res.status(200).json({
        success: true,
        cart,
      });
    }
  } catch (error) {
    console.error("FetchCart Error :", error);
    errorResponse(res, 500, serverError);
  }
};

const addToCart = async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.cookies.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({
        products: [productId],
        userId,
      });

      const saved = await newCart.save();

      return res.status(200).json({
        cart: saved,
        success: true,
      });
    } else {
      const isExist = cart.products.some(
        (product) => product.productId === productId
      );

      if (isExist) {
        return res.status(200).json({
          cart,
          success: true,
        });
      } else {
        const updatedCart = await Cart.findOneAndUpdate(
          { userId },
          {
            $addToSet: { products: productId },
          },
          { new: true }
        );

        return res.status(200).json({
          cart: updatedCart,
          success: true,
        });
      }
    }
  } catch (error) {
    console.error("AddToCart Error :", error);
    errorResponse(res, 500, serverError);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.cookies.id;
    const productId = req.body.productId;

    const cart = await Cart.findOne({ userId });

    const filteredCart = cart.products.filter((item) => item !== productId);

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        products: filteredCart,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    console.error("RemoveFromCart Error :", error);
    errorResponse(res, 500, serverError);
  }
};

export { fetchCart, addToCart, removeFromCart };
