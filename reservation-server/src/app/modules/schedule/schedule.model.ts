import { Schema, model } from "mongoose";
import { TSchedule } from "./schedule.interface";

const scheduleSchema = new Schema<TSchedule>({
  day: {
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
});

export const Schedule = model<TSchedule>("Schedule", scheduleSchema);
