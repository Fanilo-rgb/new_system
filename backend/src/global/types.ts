import mongoose, {Document} from "mongoose";

export interface DistributorType extends Document {
  numberCard: string;
  name: string;
  surname: string;
  phone: string | null;
  cin: string;
  gender: string;
  address: string;
  postalCode: number
  upline: mongoose.Schema.Types.ObjectId;
  sponsor: mongoose.Schema.Types.ObjectId;
  closed: boolean;
}

export interface CustomerType extends Document {
  name: string;
  surname: string;
  date_of_birth: mongoose.Schema.Types.Date | null;
  weight: number;
  height: number;
  gender: string;
  distributor: mongoose.Schema.Types.ObjectId | string;
}

export interface ProductType extends Document {
  name: string;
  bv: number;
  price: number | null;
  order: number;
  barcode: number | null;
}

export interface ItemType extends Document {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface CustomerOrderType extends Document {
  customer: mongoose.Schema.Types.ObjectId;
  delivered: boolean;
  payed: boolean;
  deducted: boolean;
  bag: boolean;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface SaleType extends Document {
  product: mongoose.Schema.Types.ObjectId;
  ticket: mongoose.Schema.Types.ObjectId;
  seatPurchase: boolean;
  quantity: number;
  closed: boolean;
}

export interface TicketType extends Document {
  owner: mongoose.Schema.Types.ObjectId;
  seatPurchase: boolean;
  delivered: boolean;
  printed: boolean;
}

export interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: {
    [key: string]: { message: string };
  }
}