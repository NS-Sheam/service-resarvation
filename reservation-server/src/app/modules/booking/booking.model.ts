import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>("Booking", bookingSchema);
