import mongoose, { Schema, model } from "mongoose";
import {ItemType} from "../global/types";

const stockEntrySchema = new Schema<ItemType>({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const StockEntry = model<ItemType>("StockEntry", stockEntrySchema);

export default StockEntry;