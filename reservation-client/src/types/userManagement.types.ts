export type TDay = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export type TUser = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  phone: string;
  role: "admin" | "provider" | "customer";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProvider = {
  _id: string;
  user: TUser;
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
  createdAt: string;
  updatedAt: string;
};

export type TCustomer = {
  user: TUser;
  name: string;
  email: string;
  phone: string;
  image?: string;
  isDeleted: boolean;
};
