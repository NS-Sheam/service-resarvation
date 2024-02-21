import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Customer } from "../customer/customer.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Provider } from "../provider/provider.model";
import { Service } from "../service/service.model";
import { Schedule } from "../schedule/schedule.model";
import { startSession } from "mongoose";
import { hasTimeConflict } from "./booking.utils";
import { sendBookingEmail } from "../../utils/sendBookingEmail";
import { getDayFromDate } from "../../utils/date.utils.";

const createBooking = async (payload: TBooking) => {
  payload.schedule.date = new Date(payload.schedule.date).toISOString();

  const customer = await Customer.findById(payload.customer);
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }
  const provider = await Provider.findById(payload.provider);
  if (!provider) {
    throw new AppError(httpStatus.NOT_FOUND, "Provider not found");
  }

  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const isProviderAvailableAtThatDay = provider.availableSchedule.some(
    (schedule) => schedule.day === getDayFromDate(payload.schedule.date),
  );

  if (!isProviderAvailableAtThatDay) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Provider is not available on the booking day",
    );
  }

  const providerSchedule = (await Schedule.findOne({
    provider: payload.provider,
    date: payload.schedule.date,
  })) as any;

  if (providerSchedule) {
    const isThereTimeConflict = hasTimeConflict(providerSchedule, payload);

    if (isThereTimeConflict) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "There is a time conflict with another booking",
      );
    }
  }

  const session = await startSession();

  try {
    session.startTransaction();

    const newBooking = await Booking.create([payload], { session });

    if (!newBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, "Booking creation failed");
    }

    await Schedule.create(
      [
        {
          provider: payload.provider,
          date: payload.schedule.date,
          startTime: payload.schedule.startTime,
          endTime: payload.schedule.endTime,
          booking: newBooking[0]._id,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    await sendBookingEmail(customer, provider, payload.schedule, service);

    return newBooking[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
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
