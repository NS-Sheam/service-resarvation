import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import config from "../config";
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});
export const deleteImageFromCloudinary = async (
  imageUrl: string,
): Promise<unknown> => {
  // making promise to send image to cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(imageUrl, function (error, result) {
      if (error) {
        reject(error);
      }
      console.log(result);

      resolve(result as UploadApiResponse);
    });
  });
};
