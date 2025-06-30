import mongoose from "mongoose";

const order = mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    required: true,
    trim: true,
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String,
    required: true,
    trim: true,
  },
  billingAddress: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  cancellation: {
    isCancelled: Boolean,
    cancelledAt: {
      type: Date,
    },
  },
  return: {
    isReturned: Boolean,
    returnedAt: {
      type: Date,
    },
    reason: {
      type: String,
      trim: true,
    },
  },
});

const Order = mongoose.model("orders", order);

export { Order };
