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
