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
      cancellation: {
        isCancelled: false,
        cancelledAt: Date.now(),
      },
      return: {
        isReturned: false,
        returnedAt: Date.now(),
        reason: "",
      },
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
    const orderId = req.body.id;
    const reason = req.body.reason;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        return: {
          isReturned: true,
          returnedAt: Date.now(),
          reason: reason,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ReturnProduct Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.body.id;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        cancellation: {
          isCancelled: true,
          cancelledAt: Date.now(),
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("CancelOrder Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

const fetchOrders = async (req, res) => {
  try {
    const userId = req.cookies.id;

    const orders = await Order.find({ customerId: userId });

    return res.status(200).json({
      succes: true,
      orders,
    });
  } catch (error) {
    console.log("FetchOrders Error :", error);
    return errorResponse(res, 500, serverError);
  }
};

export { orderProducts, returnProduct, cancelOrder, fetchOrders };
