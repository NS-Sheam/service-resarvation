import { Schema, model } from "mongoose";
import { TSchedule } from "./schedule.interface";

const scheduleSchema = new Schema<TSchedule>({
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
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
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
});

export const Schedule = model<TSchedule>("Schedule", scheduleSchema);
