import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ServiceServices } from "./service.service";

const addService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.addService(
    req.user.userId,
    req.body,
    req.files,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.getAllServices(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All services fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service fetched successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const service = req.body;

  const result = await ServiceServices.updateService(
    id,
    service,
    req.user,
    req.files,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ServiceServices.deleteService(id, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceControllers = {
  addService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
