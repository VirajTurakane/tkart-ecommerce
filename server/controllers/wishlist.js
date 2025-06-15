import {
  serverError,
  wishlistNotFound,
} from "../utils/constants/textConstants.js";
import { errorResponse } from "../utils/helpers/response.js";
import { Wishlist } from "../models/wishlist.js";

const wishlist = async (req, res) => {
  try {
    const id = req.cookies.id;

    const wishlist = await Wishlist.findOne({
      userId: id,
    });

    if (!wishlist) {
      return errorResponse(res, 404, wishlistNotFound);
    }

    return res.status(200).json({
      wishlist: wishlist.wishlist,
      success: true,
    });
  } catch (error) {
    console.error("Wishlist Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

const wishlistById = async (req, res) => {
  try {
    const id = req.cookies.id;
    const productId = req.params.productId;

    const wishlist = await Wishlist.findOne({
      userId: id,
    });

    if (!wishlist) {
      return errorResponse(res, 404, wishlistNotFound);
    } else {
      const filteredList = wishlist.wishlist.filter(
        (product) => product.productId === productId
      );

      if (filteredList.length === 0) {
        return res.status(200).json({
          isAdded: false,
          success: true,
          filteredList,
        });
      } else {
        return res.status(200).json({
          isAdded: true,
          success: true,
          filteredList,
        });
      }
    }
  } catch (error) {
    console.error("Wishlist Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

const addWishlist = async (req, res) => {
  try {
    const userId = req.cookies.id;
    const productId = req.body.productId;

    const wishlist = await Wishlist.findOne({
      userId: userId,
    });

    const isExist = wishlist.wishlist.some(
      (item) => item.productId === productId
    );

    if (wishlist) {
      if (isExist) {
        return res.status(200).json({
          wishlist: wishlist,
          success: true,
        });
      } else {
        const updatedWishlist = await Wishlist.findOneAndUpdate(
          { userId },
          { $addToSet: { wishlist: { productId } } },
          { new: true }
        );

        return res.status(200).json({
          wishlist: updatedWishlist,
          success: true,
        });
      }
    } else {
      const newWishlist = new Wishlist({
        wishlist: [
          {
            productId,
          },
        ],
        userId: userId,
      });

      const saved = await newWishlist.save();

      return res.status(200).json({
        wishlist: saved,
        success: true,
      });
    }
  } catch (error) {
    console.error("Add Wishlist Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.cookies.id;
    const productId = req.body.productId;

    const wishlist = await Wishlist.findOne({ userId });

    const filteredList = wishlist.wishlist.filter(
      (id) => id.productId !== productId
    );

    const updatedProduct = await Wishlist.findOneAndUpdate(
      { userId },
      {
        wishlist: filteredList,
      },
      { new: true }
    );

    return res.status(200).json({
      wishlist: updatedProduct,
      success: true,
    });
  } catch (error) {
    console.error("Add Wishlist Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

export { wishlist, addWishlist, removeFromWishlist, wishlistById };
