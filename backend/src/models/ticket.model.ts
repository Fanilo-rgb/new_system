import mongoose, {model, Schema} from 'mongoose';
import {TicketType} from "../global/types";

const ticketSchema = new Schema<TicketType>({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Distributor",
    required: [true, 'Select a distributor'],
  },
  seatPurchase: {
    type: Boolean,
    default: false,
  },
  delivered: {
    type: Boolean,
    default: true,
  },
  printed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

ticketSchema.pre("save", function(next) {
  if (this.seatPurchase) {
    this.delivered = false;
  }
  next();
})

const Ticket = model<TicketType>("Ticket", ticketSchema);

export default Ticket;
