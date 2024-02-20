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

export const BookingControllers = {
  createBooking,
};
