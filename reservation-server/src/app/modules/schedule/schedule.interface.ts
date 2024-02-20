import { Types } from "mongoose";

export type TSchedule = {
  day: string;
  startTime: string;
  endTime: string;
  booking: Types.ObjectId;
};
