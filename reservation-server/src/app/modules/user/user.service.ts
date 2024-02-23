/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TCustomer } from "../customer/customer.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Customer } from "../customer/customer.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TProvider } from "../provider/provider.interface";
import { Provider } from "../provider/provider.model";
import { verifyToken } from "../Auth/auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const createCustomer = async (
  file: any,
  password: string,
  payload: TCustomer & { userName: string },
) => {
  const userData: Partial<TUser> = {};
  userData.userName = payload.userName;
  userData.password = password;
  userData.email = payload.email;
  userData.role = "customer";

  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Create User
    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    payload.user = newUser[0]._id;

    // Transaction 2: Create Customer
    if (file) {
      const { secure_url } = (await sendImageToCloudinary(
        payload.userName,
        file?.path,
      )) as any;

      payload.image = secure_url;
    }
    const newCustomer = await Customer.create([payload], { session });
    if (!newCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newCustomer[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

const createProvider = async (
  file: any,
  password: string,
  payload: TProvider & { userName: string },
) => {
  const userData: Partial<TUser> = {};

  userData.userName = payload.userName;
  userData.password = password;
  userData.email = payload.email;
  userData.role = "provider";

  const session = await mongoose.startSession();

  try {
    // Starting Session
    session.startTransaction();

    // Transaction 1: Create User
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }
    payload.user = newUser[0]._id;

    // Transaction 2: Create Provider
    if (file) {
      const { secure_url } = (await sendImageToCloudinary(
        payload.userName,
        file?.path,
      )) as any;
      payload.image = secure_url;
    }

    const newProvider = await Provider.create([payload], { session });

    if (!newProvider) {
      throw new AppError(httpStatus.BAD_REQUEST, "Provider creation failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return newProvider[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

const getMe = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_access_secret as string);

  const { userId, role } = decoded as JwtPayload;
  // check if user exists
  let result = null;
  if (role === "customer") {
    result = await Customer.findOne({ user: userId }).populate("user");
  } else if (role === "provider") {
    result = await Provider.findOne({ user: userId }).populate("user");
  }

  return result;
};

export const UserServices = {
  createCustomer,
  createProvider,
  getMe,
};
