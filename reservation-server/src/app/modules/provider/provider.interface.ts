import { Types } from "mongoose";

export type TProvider = {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  image?: string;
  location: string;
  availableSchedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  isDeleted: boolean;
};
