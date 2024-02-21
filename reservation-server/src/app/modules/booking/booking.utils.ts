import { TSchedule } from "../schedule/schedule.interface";
import { TBooking } from "./booking.interface";

export const hasTimeConflict = (
  schedule: TSchedule,
  booking: TBooking,
): boolean => {
  const scheduleStartTime = new Date(`${schedule.date}T${schedule.startTime}`);
  const scheduleEndTime = new Date(`${schedule.date}T${schedule.endTime}`);

  const bookingStartTime = new Date(
    `${booking.schedule.date}T${booking.schedule.startTime}`,
  );
  const bookingEndTime = new Date(
    `${booking.schedule.date}T${booking.schedule.endTime}`,
  );

  if (
    bookingStartTime >= scheduleStartTime &&
    bookingStartTime < scheduleEndTime
  ) {
    return true;
  }

  if (bookingEndTime > scheduleStartTime && bookingEndTime <= scheduleEndTime) {
    return true;
  }

  if (
    bookingStartTime <= scheduleStartTime &&
    bookingEndTime >= scheduleEndTime
  ) {
    return true;
  }

  return false;
};
