import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBooking(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBooking();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings fetched successfully",
    data: result,
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
  const result = await BookingServices.customerBooking(req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings fetched successfully",
    data: result,
  });
});

const providerBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.providerBooking(req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings fetched successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.cancelBooking(req.params.id);

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
