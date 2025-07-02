import mongoose, {model, Schema} from 'mongoose';
import {DistributorType} from "../global/types";

const distributorSchema = new Schema<DistributorType>({
  numberCard: {
    type: String,
    unique: true,
    required: [true, "A number card is required"],
    minlength: [7, "Must be at least 7 characters long."],
    maxlength: [8, "Must be under 8 characters."],
  },
  name: {
    type: String,
    required: [true, "A name is required"],
    trim: true,
    uppercase: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not a valid gender.",
    },
    required: [true, "Please choose a valid gender"],
  },
  cin: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: "Antananarivo",
  },
  postalCode: {
    type: Number,
    default: 101,
  },
  upline: {
    type: mongoose.Types.ObjectId,
    ref: "Distributor",
    default: null,
  },
  sponsor: {
    type: mongoose.Types.ObjectId,
    ref: "Distributor",
    default: null,
  },
  closed: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

distributorSchema.pre("save", function (next) {
  if (!this.surname || this.surname.trim() === "") {
    this.surname = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  }
  next();
});

const Distributor = model<DistributorType>("Distributor", distributorSchema);

export default Distributor;
