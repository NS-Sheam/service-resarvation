import { TService } from "../types";

export const weekDayNumbers = (service: TService) => {
  return service.provider.availableSchedule.map((schedule) => {
    switch (schedule.day) {
      case "Sunday":
        return 0;
      case "Monday":
        return 1;
      case "Tuesday":
        return 2;
      case "Wednesday":
        return 3;
      case "Thursday":
        return 4;
      case "Friday":
        return 5;
      case "Saturday":
        return 6;
      default:
        return 0;
    }
  });
};
