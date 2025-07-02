import mongoose, {model, Schema} from "mongoose";
import {SaleType} from "../global/types";

const saleSchema = new Schema<SaleType>({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required'],
  },
  ticket: {
    type: mongoose.Types.ObjectId,
    ref: 'Ticket',
    required: [true, "Ticket is required"],
  },
  seatPurchase: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  closed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Sale = model<SaleType>("Sale", saleSchema);

export default Sale;