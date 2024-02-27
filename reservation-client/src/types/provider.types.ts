export type TProvider = {
  _id: string;
  user: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  location: string;
  availableSchedule: AvailableSchedule[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export interface AvailableSchedule {
  day: string;
  startTime: string;
  endTime: string;
  _id: string;
}
