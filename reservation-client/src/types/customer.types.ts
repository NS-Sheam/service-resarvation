import { TUser } from "../types";
export type TCustomer = {
  _id: string;
  user: TUser;
  name: string;
  email: string;
  phone: string;
  image: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TEventData = {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  isReadonly?: boolean;
};
