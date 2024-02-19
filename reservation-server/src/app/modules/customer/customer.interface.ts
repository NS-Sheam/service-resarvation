import { Types } from "mongoose";

export type TCustomer = {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  image?: string;
  isDeleted: boolean;
};
