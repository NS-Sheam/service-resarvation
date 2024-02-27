import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBooking(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBooking(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getSingleBooking(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking fetched successfully",
    data: result,
  });
});

const customerBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.customerBooking(
    req.user.userId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const providerBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.providerBooking(
    req.user.userId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.cancelBooking(
    req.user.userId,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  customerBooking,
  providerBooking,
  cancelBooking,
};
