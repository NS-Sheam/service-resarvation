import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ProviderServices } from "./provider.service";

const getAllProviders = catchAsync(async (req: Request, res: Response) => {
  const result = await ProviderServices.getAllProviders(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All providers fetched successfully",
    data: result,
  });
});

const getSingleProvider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProviderServices.getSingleProvider(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Provider fetched successfully",
    data: result,
  });
});

const updateProvider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const provider = req.body?.provider || req.body;

  const result = await ProviderServices.updateProvider(id, provider, req.file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Provider updated successfully",
    data: result,
  });
});

const deleteProvider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProviderServices.deleteProvider(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Provider deleted successfully",
    data: result,
  });
});

export const ProviderControllers = {
  getAllProviders,
  getSingleProvider,
  updateProvider,
  deleteProvider,
};
