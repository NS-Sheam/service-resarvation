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
    schedule: z.object({
      date: z.string({
        required_error: "Date is required",
      }),
      startTime: z.string({
        required_error: "Start time is required",
      }),
      endTime: z.string({
        required_error: "End time is required",
      }),
    }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
