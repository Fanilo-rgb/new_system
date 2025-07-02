import mongoose, {model, Schema} from 'mongoose';
import {CustomerOrderType} from "../global/types";

const customerOrderSchema = new Schema<CustomerOrderType>({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: [true, "A customer is required"],
  },
  delivered: {
    type: Boolean,
    default: false
  },
  deducted: {
    type: Boolean,
    default: false
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const CustomerOrder = model<CustomerOrderType>("CustomerOrder", customerOrderSchema);

export default CustomerOrder;