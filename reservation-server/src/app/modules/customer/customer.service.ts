import mongoose, { Types } from "mongoose";
import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { customerSearchableFields } from "./customer.const";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TUser } from "../user/user.interface";
import { Booking } from "../booking/booking.model";

const getAllCustomers = async (query: Record<string, unknown>) => {
  const customerQuery = new QueryBuilder(Customer.find(), query)
    .search(customerSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate();

  const result = await customerQuery.modelQuery;
  const meta = await customerQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleCustomer = async (customerId: string) => {
  const result = Customer.findById(customerId);
  return result;
};

const updateCustomer = async (
  customerId: string,
  payload: Partial<TCustomer>,
  file: any,
) => {
  const customer = await Customer.findById(customerId).populate("user");
  const user = (await User.findById(customer?.user)) as TUser & { _id: string };

  if (file) {
    const { secure_url } = (await sendImageToCloudinary(
      user?.userName,
      file?.path,
    )) as any;

    payload.image = secure_url;
  }

  const result = Customer.findByIdAndUpdate(customerId, payload, {
    new: true,
  });
  return result;
};

const deleteCustomer = async (customerId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1: Delete User
    const user = await Customer.findById(
      { _id: customerId },
      { user: 1, _id: 0 },
    );

    const userId = user?.user.toString();

    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User deletion failed");
    }
    // Transaction 2: Delete Customer
    const deletedCustomer = await Customer.findByIdAndUpdate(
      { _id: customerId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer deletion failed");
    }
    const deleteCustomerBooking = await Booking.deleteMany(
      { customer: customerId },
      { session },
    );
    if (!deleteCustomerBooking) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Customer booking deletion failed",
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedCustomer;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const CustomerServices = {
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
