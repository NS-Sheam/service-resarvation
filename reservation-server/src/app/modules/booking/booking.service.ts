import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: TBooking) => {
  const bookingSchedule = payload.schedule;
  console.log(bookingSchedule);

  return null;
};

const getAllBooking = async () => {
  const result = await Booking.find().populate(
    "customer service provider schedule",
  );
  return result;
};

export const BookingServices = {
  createBooking,
  getAllBooking,
};
