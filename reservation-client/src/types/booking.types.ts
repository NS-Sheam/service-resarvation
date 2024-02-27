import { TCustomer, TProvider, TService } from ".";

export type TSchedule = {
  date: Date;
  startTime: string;
  endTime: string;
};

export type TBooking = {
  _id: string;
  customer: TCustomer;
  schedule: TSchedule;
  service: TService;
  provider: TProvider;
  createdAt: Date;
  updatedAt: Date;
};
