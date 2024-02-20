import { Types } from "mongoose";

export type TDay =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type TProvider = {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  image?: string;
  location: string;
  availableSchedule: {
    day: TDay;
    startTime: string;
    endTime: string;
  }[];
  isDeleted: boolean;
};
