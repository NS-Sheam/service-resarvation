import { TProvider } from ".";

export type TService = {
  _id: string;
  name: string;
  description: string;
  provider: TProvider;
  pricePerHour: number;
  images: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
