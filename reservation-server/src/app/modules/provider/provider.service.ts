import mongoose, { Types } from "mongoose";

import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TUser } from "../user/user.interface";
import { providerSearchableFields } from "./provider.const";
import { Provider } from "./provider.model";
import { TProvider } from "./provider.interface";
import { Service } from "../service/service.model";

const getAllProviders = async (query: Record<string, unknown>) => {
  const providerQuery = new QueryBuilder(Provider.find(), query)
    .search(providerSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate();

  const result = await providerQuery.modelQuery;
  const meta = await providerQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleProvider = async (providerId: string) => {
  const result = Provider.findById(providerId);
  return result;
};

const updateProvider = async (
  providerId: string,
  payload: Partial<TProvider>,
  file: any,
) => {
  const provider = await Provider.findById(providerId).populate("user");
  const user = (await User.findById(provider?.user)) as TUser & { _id: string };

  if (file) {
    const { secure_url } = (await sendImageToCloudinary(
      user?.userName,
      file?.path,
    )) as any;

    payload.image = secure_url;
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newProvider = await Provider.findByIdAndUpdate(providerId, payload, {
      new: true,
      session,
    });
    if (!newProvider) {
      throw new AppError(httpStatus.BAD_REQUEST, "Provider update failed");
    }

    const newServiceWithLocation = await Service.updateMany(
      { provider: providerId },
      { location: payload.location || provider?.location },
      { session },
    );
    if (!newServiceWithLocation) {
      throw new AppError(httpStatus.BAD_REQUEST, "Service update failed");
    }
    await session.commitTransaction();
    await session.endSession();

    return newProvider;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const deleteProvider = async (providerId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1: Delete User
    const user = await Provider.findById(
      { _id: providerId },
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
    // Transaction 2: Delete Provider
    const deletedProvider = await Provider.findByIdAndUpdate(
      { _id: providerId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedProvider) {
      throw new AppError(httpStatus.BAD_REQUEST, "Provider deletion failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedProvider;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const ProviderServices = {
  getAllProviders,
  getSingleProvider,
  updateProvider,
  deleteProvider,
};
