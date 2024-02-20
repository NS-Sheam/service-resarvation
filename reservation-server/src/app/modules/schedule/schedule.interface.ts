import { Types } from "mongoose";

export type TSchedule = {
  provider: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  booking: Types.ObjectId;
};
