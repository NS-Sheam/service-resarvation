export type TDay = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export type TAvailableSchedule = {
  day: TDay;
  startTime: string;
  endTime: string;
  _id: string;
};
export type TProvider = {
  _id: string;
  user: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  location: string;
  availableSchedule: TAvailableSchedule[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
