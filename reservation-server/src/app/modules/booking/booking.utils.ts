import { TSchedule } from "../schedule/schedule.interface";
import { TBooking } from "./booking.interface";

export const hasTimeConflict = (
  schedule: TSchedule & { _id: string },
  booking: TBooking,
): boolean => {
  const bookingStart = booking.schedule.startTime;
  const bookingEnd = booking.schedule.endTime;
  const scheduleStart = schedule.startTime;
  const scheduleEnd = schedule.endTime;

  console.log(bookingStart, bookingEnd, scheduleStart, scheduleEnd);

  if (
    (bookingStart >= scheduleStart && bookingStart <= scheduleEnd) ||
    (bookingEnd >= scheduleStart && bookingEnd <= scheduleEnd)
  ) {
    return true;
  }

  return false;
};
