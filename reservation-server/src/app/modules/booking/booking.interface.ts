import { Types } from "mongoose";

export type TBooking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  provider: Types.ObjectId;
  schedule: {
    date: string;
    startTime: string;
    endTime: string;
  };
};
