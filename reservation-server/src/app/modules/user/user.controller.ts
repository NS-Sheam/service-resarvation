import { UserServices } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

// create customer with image file upload
const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { password, customer } = req.body;

  const result = await UserServices.createCustomer(
    req.file,
    password,
    customer,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

const createProvider = catchAsync(async (req: Request, res: Response) => {
  const { password, provider } = req.body;

  const result = await UserServices.createProvider(
    req.file,
    password,
    provider,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Provider created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await UserServices.getMe(token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const UserControllers = {
  createCustomer,
  createProvider,
  getMe,
};
