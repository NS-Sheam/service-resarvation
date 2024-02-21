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
import QueryBuilder from "../../builder/QueryBuilder";
import { cancelBookingEmail } from "../../utils/sendCancelBookingEmail";

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

    throw new AppError(httpStatus.BAD_REQUEST, "Booking creation failed");
  }
};

const getAllBooking = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate("customer service provider schedule"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  const meta = await bookingQuery.countTotal();

  return { result, meta };
};

const getSingleBooking = async (id: string) => {
  const result = await Booking.findById(id).populate(
    "customer service provider schedule",
  );
  return result;
};

const customerBooking = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const customer = await Customer.findOne({ user: userId });

  const customerBookingQuery = new QueryBuilder(
    Booking.find({ customer: customer?._id }).populate(
      "customer service provider schedule",
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await customerBookingQuery.modelQuery;
  const meta = await customerBookingQuery.countTotal();

  return { result, meta };
};
const providerBooking = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const provider = await Provider.findOne({ user: userId });
  const providerBookingQuery = new QueryBuilder(
    Booking.find({ provider: provider?._id }).populate(
      "customer service provider schedule",
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await providerBookingQuery.modelQuery;
  const meta = await providerBookingQuery.countTotal();

  return { result, meta };
};
const cancelBooking = async (id: string) => {
  const booking = await Booking.findById(id).populate(
    "customer provider service schedule",
  );

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedBooking = await Booking.findByIdAndDelete(id, {
      session,
      new: true,
    });
    if (!deletedBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, "Booking cancelation failed");
    }

    const schedule = await Schedule.findOneAndDelete(
      { booking: id },
      { session },
    );
    if (!schedule) {
      throw new AppError(httpStatus.BAD_REQUEST, "Booking cancelation failed");
    }
    await cancelBookingEmail(
      booking?.customer as any,
      booking?.provider as any,
      booking?.schedule as any,
      booking?.service as any,
    );
    await session.commitTransaction();
    await session.endSession();
    return deletedBooking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Booking cancelation failed");
  }
};
export const BookingServices = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  customerBooking,
  providerBooking,
  cancelBooking,
};
