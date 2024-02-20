export const hasTimeConflict = (
  schedule: TSchedule,
  booking: TBooking,
): boolean => {
  const scheduleStart = new Date(schedule.startTime).getTime();
  const scheduleEnd = new Date(schedule.endTime).getTime();
  const bookingStart = new Date(booking.startTime).getTime();
  const bookingEnd = new Date(booking.endTime).getTime();
  return (
    (bookingStart >= scheduleStart && bookingStart < scheduleEnd) ||
    (bookingEnd > scheduleStart && bookingEnd <= scheduleEnd) ||
    (bookingStart <= scheduleStart && bookingEnd >= scheduleEnd)
  );
};
