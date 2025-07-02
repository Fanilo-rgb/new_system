import mongoose, { Schema, model } from 'mongoose';
import {ItemType} from "../global/types";

const stockSchema = new Schema<ItemType>({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Stock = model<ItemType>("Stock", stockSchema);

export default Stock;