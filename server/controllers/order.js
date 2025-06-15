import { orderZodSchema } from "../schemas/order.js";
import { errorResponse } from "../utils/helpers/response.js";
import {
  invalidData,
  productNotFound,
  serverError,
} from "../utils/constants/textConstants.js";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";
import { User } from "../models/user.js";

const orderProducts = async (req, res) => {
  try {
    const body = orderZodSchema.safeParse(req.body);
    const customerId = req.cookies.id;

    if (!body.success) {
      return errorResponse(res, 400, invalidData);
    }

    const data = body.data;

    const product = await Product.findById(data.id);

    if (!product) {
      return errorResponse(res, 404, productNotFound);
    }

    const customer = await User.findById(customerId);

    const order = new Order({
      customerId: customer._id,
      productId: product._id,
      orderedAt: Date.now(),
      shippingAddress: customer.shippingAddress,
      billingAddress: customer.billingAddress,
      quantity: data.quantity,
    });

    const savedOrder = await order.save();

    return res.status(201).json({
      success: true,
      message: "Order successful.",
      savedOrder,
    });
  } catch (error) {
    console.log("Order Products Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

const returnProduct = async (req, res) => {
  try {
    const body = orderZodSchema.safeParse(req.body);

    if (!body.success) {
      return errorResponse(res, 400, invalidData);
    }

    const data = body.data;
    const returnedProduct = await Order.findById(data.id);
      // {
      //     return: {
      //       isReturned: true,
      //       reason: data.reason,
      //     },
      // },
    return res.status(200).json({
      success: true,
      returnedProduct,
    });
  } catch (error) {
    console.log("Return Product Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

export { orderProducts, returnProduct };
