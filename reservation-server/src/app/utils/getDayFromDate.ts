import { weekDays } from "../modules/provider/provider.const";

export const getDayFromDate = (date: string): string => {
  const day = new Date(date).getDay();
  return weekDays[day];
};
