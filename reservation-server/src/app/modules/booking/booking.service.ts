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
import { User } from "../user/user.model";

const createBooking = async (userId: string, payload: TBooking) => {
  const isUserVerified = await User.findOne({
    _id: userId,
    isEmailVerified: true,
  });
  if (!isUserVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
  }
  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }
  payload.customer = customer._id;
  payload.schedule.date = new Date(payload.schedule.date).toISOString();

  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  payload.provider = service.provider;
  const provider = await Provider.findById(service.provider);
  if (!provider) {
    throw new AppError(httpStatus.NOT_FOUND, "Provider not found");
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
  const isBookingTimeIsPast = new Date(payload.schedule.date) < new Date();
  if (isBookingTimeIsPast) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can not book a service in the past",
    );
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
          provider: service.provider,
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

const serviceBooking = async (
  serviceId: string,
  query: Record<string, unknown>,
) => {
  const serviceBookingQuery = new QueryBuilder(
    Booking.find({ service: serviceId }).populate(
      "customer service provider schedule",
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await serviceBookingQuery.modelQuery;
  const meta = await serviceBookingQuery.countTotal();

  return { result, meta };
};
const providerBookingByProviderId = async (providerId: string) => {
  const result = await Booking.find({ provider: providerId }).populate(
    "customer service provider schedule",
  );
  return result;
};

const cancelBooking = async (userId: string, id: string) => {
  const booking = await Booking.findById(id).populate(
    "customer provider schedule service",
  );
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const user =
    (await Customer.findOne({ user: userId })) ||
    (await Provider.findOne({ user: userId }));

  const isUserAuthorized =
    booking.customer.equals(user?._id) || booking.provider.equals(user?._id);

  if (!isUserAuthorized) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to cancel this booking",
    );
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
  serviceBooking,
  providerBookingByProviderId,
};
