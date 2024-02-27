import { Types } from "mongoose";

export type TService = {
  name: string;
  description: string;
  location: string;
  provider: Types.ObjectId;
  pricePerHour: number;
  images: string[];
  isDeleted: boolean;
};
