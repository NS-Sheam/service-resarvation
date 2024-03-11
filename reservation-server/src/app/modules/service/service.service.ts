import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { serviceSearchableFields } from "./service.const";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { JwtPayload } from "jsonwebtoken";
import { Provider } from "../provider/provider.model";
import mongoose from "mongoose";
import {
  deleteImageFromCloudinary,
  getPublicId,
} from "../../utils/deleteImageFromCloudinary";
import { Booking } from "../booking/booking.model";
const addService = async (userId: string, payload: TService, files: any) => {
  const isUserVerified = await User.findOne({
    _id: userId,
    isEmailVerified: true,
  });
  if (!isUserVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
  }

  const isProviderExist = await Provider.findOne({ user: userId });
  if (!isProviderExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Provider not found");
  }
  payload.provider = isProviderExist._id;
  payload.location = isProviderExist.location;

  const images: string[] = [];

  if (files && files.length) {
    let imageNo = 0;
    for (const file of files) {
      const imageName = `${payload.name}-"image"-${imageNo}`;
      const path = file?.path;

      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      images.push(secure_url as string);
      imageNo++;
    }
  }
  payload.images = images;

  const result = await Service.create(payload);
  return result;
};

const getAllServices = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(
    Service.find().populate("provider"),
    query,
  )
    .search(serviceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await serviceQuery.modelQuery;

  const meta = await serviceQuery.countTotal();
  return { result, meta };
};

const getSingleService = async (serviceId: string) => {
  const result = Service.findById(serviceId).populate("provider");
  return result;
};

const updateService = async (
  serviceId: string,
  payload: Partial<TService> & { deletedImages: string[] },
  user: JwtPayload,
  files: any,
) => {
  const isUserVerified = await User.findOne({
    _id: user.userId,
    isEmailVerified: true,
  });
  if (!isUserVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
  }
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const isUserOwnerOfTheService = await Service.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(serviceId),
      },
    },
    {
      $lookup: {
        from: "providers",
        localField: "provider",
        foreignField: "_id",
        as: "provider",
      },
    },
    {
      $unwind: "$provider",
    },
    {
      $match: {
        "provider.email": user.email,
      },
    },
  ]);

  if (!isUserOwnerOfTheService) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not the owner");
  }
  const publicIds = service?.images?.map((image) => {
    return getPublicId(image);
  });

  if (publicIds && publicIds.length) {
    await deleteImageFromCloudinary(publicIds);
  }

  const images: string[] = [];

  if (files && files.length) {
    let imageNo = 0;
    for (const file of files) {
      const imageName = `${payload.name}-"image"-${imageNo}`;
      const path = file?.path;

      // send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      images.push(secure_url as string);
      imageNo++;
    }
  }
  payload.images = images;

  const result = Service.findByIdAndUpdate(serviceId, payload, {
    new: true,
  });
  return result;
};

const deleteService = async (serviceId: string, user: JwtPayload) => {
  const isUserVerified = await User.findOne({
    _id: user.userId,
    isEmailVerified: true,
  });
  if (!isUserVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
  }

  const service = await Service.findById(serviceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  const provider = await Provider.findOne({ user: user.userId });

  if (!provider) {
    throw new AppError(httpStatus.NOT_FOUND, "Provider not found");
  }

  const isUserOwnerOfTheService = await Service.findOne({
    _id: serviceId,
    provider: provider?._id,
  });

  if (!isUserOwnerOfTheService) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not the owner");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedService = await Service.findByIdAndUpdate(
      serviceId,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedService) {
      throw new AppError(httpStatus.BAD_REQUEST, "Service deleting failed");
    }
    const deletedBookingsOfThisService = await Booking.deleteMany(
      { service: service?.id },
      { session },
    );
    if (!deletedBookingsOfThisService) {
      throw new AppError(httpStatus.BAD_REQUEST, "Service deleting failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteService;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

export const ServiceServices = {
  addService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
