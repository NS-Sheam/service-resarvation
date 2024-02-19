import { Types } from "mongoose";

export type TService = {
  name: string;
  description: string;
  provider: Types.ObjectId;
  pricePerHour: number;
  images: string[];
  isDeleted: boolean;
};
