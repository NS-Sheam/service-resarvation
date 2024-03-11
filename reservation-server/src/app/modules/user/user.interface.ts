/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export type TUser = {
  userName: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  phone: string;
  role: "admin" | "provider" | "customer";
  isDeleted: boolean;
  isEmailVerified: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<boolean>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
