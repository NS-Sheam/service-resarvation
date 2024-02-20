import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    customer: z.string({
      required_error: "Customer is required",
    }),
    provider: z.string({
      required_error: "Provider is required",
    }),
    service: z.string({
      required_error: "Service is required",
    }),
    schedule: z.string({
      required_error: "Schedule is required",
    }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
