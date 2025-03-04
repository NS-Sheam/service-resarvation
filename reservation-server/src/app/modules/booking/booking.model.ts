import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
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
      date: {
        type: String,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>("Booking", bookingSchema);
