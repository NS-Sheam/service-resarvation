import { Types } from "mongoose";

export type TProvider = {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  image?: string;
  location: string;
  isDeleted: boolean;
  availableSchedule: {
    day: string;
    start: string;
    end: string;
  }[];
};
