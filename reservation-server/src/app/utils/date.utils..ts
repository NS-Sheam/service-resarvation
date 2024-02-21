import { weekDays } from "../modules/provider/provider.const";

export const getDayFromDate = (date: string): string => {
  const day = new Date(date).getDay();
  return weekDays[day];
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
};

export const formatTime = (timeString: string) => {
  const time = new Date(`2024-02-23T${timeString}:00.000Z`);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true } as const;
  return time.toLocaleTimeString("en-US", options);
};
