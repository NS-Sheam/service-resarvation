import { weekDays } from "../modules/provider/provider.const";

export const getDayFromDate = (date: string): string => {
  const day = new Date(date).getDay();
  console.log(weekDays[day]);
  return weekDays[day];
};
