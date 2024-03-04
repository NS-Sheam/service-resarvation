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
import { deleteImageFromCloudinary } from "../../utils/deleteImageFromCloudinary";
const addService = async (userId: string, payload: TService, files: any) => {
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

  if (service.images.length > 0) {
    for (const imageUrl of service.images) {
      await deleteImageFromCloudinary(imageUrl);
    }
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
  // let modifiedImages: string[] = [...service.images];

  // // Process files to delete and add images
  // if (files && files.length) {
  //   // Add new images
  //   for (const image of files) {
  //     const imageName = `${service.name}-"image"-${modifiedImages.length}`;
  //     const path = image.path;

  //     // send image to cloudinary
  //     const { secure_url } = await sendImageToCloudinary(imageName, path);

  //     modifiedImages.push(secure_url as string);
  //   }

  //   // Remove deleted images
  //   if (payload.deletedImages && payload.deletedImages.length) {
  //     modifiedImages = modifiedImages.filter((image) => {
  //       return !payload.deletedImages.includes(image);
  //     });
  //   }
  // }

  // payload.images = modifiedImages;

  const result = Service.findByIdAndUpdate(serviceId, payload, {
    new: true,
  });
  return result;
};

const deleteService = async (serviceId: string, user: JwtPayload) => {
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const isUserOwnerOfTheService = await Service.findOne({
    _id: serviceId,
    provider: user.email,
  });

  if (!isUserOwnerOfTheService) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not the owner");
  }

  const result = Service.findByIdAndUpdate(
    serviceId,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const ServiceServices = {
  addService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
