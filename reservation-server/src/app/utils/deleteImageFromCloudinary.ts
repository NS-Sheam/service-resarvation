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
  public_ids: string[],
): Promise<unknown> => {
  // making promise to send image to cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(public_ids, function (error, result) {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
};

export const getPublicId = (imageUrl: string) => {
  const parts = imageUrl.split("/upload/");
  if (parts.length < 2) {
    throw new Error("Invalid Cloudinary image URL");
  }

  const versionParts = parts[1].split("/");
  const publicIdWithVersion = versionParts.slice(1).join("/"); // Exclude the "upload" part
  const publicId = publicIdWithVersion.split(".")[0]; // Remove the file extension
  const regex = /(%[0-9a-fA-F]{2})+/g;

  // Function to replace URL-encoded characters with their decoded equivalents
  const decodedString = publicId.replace(regex, (match) => {
    const bytes = match
      .split("%")
      .slice(1)
      .map((hex) => parseInt(hex, 16));
    return String.fromCharCode(...bytes);
  });

  return decodedString;
};
