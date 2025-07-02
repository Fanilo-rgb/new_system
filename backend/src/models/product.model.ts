import {model, Schema} from 'mongoose';
import {ProductType} from "../global/types";

const productSchema = new Schema<ProductType>({
  name: {
    type: String,
    trim: true,
    unique: [true, "This product already exists"],
    required: [true, "The name of the product is required"],
  },
  bv: {
    type: Number,
    min: 1,
    required: [true, "The BV is required"],
  },
  price: {
    type: Number,
    default: null,
  },
  order: {
    type: Number,
    unique: [true, "The order must be unique"],
    required: [true, "The order is required"],
  },
  barcode: {
    type: String,
    default: null,
  },
});

const Product = model<ProductType>("Product", productSchema);

export default Product;
