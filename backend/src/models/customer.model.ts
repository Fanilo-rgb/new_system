import mongoose, {model, Schema} from 'mongoose';
import {CustomerType} from "../global/types";

const customerSchema = new Schema<CustomerType>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    uppercase: true
  },
  surname: {
    type: String,
    trim: true
  },
  date_of_birth: {
    type: Date,
    default: null
  },
  height: {
    type: Number,
    min: 100,
    required: [true, "The height is required"],
  },
  weight: {
    type: Number,
    required: [true, "The weight is required"],
  },
  gender: {
    type: String,
    required: [true, "The gender is required"],
    enum: ["male", "female"],
  },
  distributor: {
    type: mongoose.Types.ObjectId,
    ref: "Distributor",
    required: [true, "The distributor is required"],
  }
}, { timestamps: true });

const Customer = model<CustomerType>("Customer", customerSchema);

export default Customer;