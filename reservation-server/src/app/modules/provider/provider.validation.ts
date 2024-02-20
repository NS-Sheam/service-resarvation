import { z } from "zod";
import { weekDays } from "./provider.const";

const createProviderValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    provider: z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      email: z.string({
        required_error: "Email is required",
      }),
      phone: z.string({
        required_error: "Phone is required",
      }),
      image: z.string().optional(),
      location: z.string({
        required_error: "Location is required",
      }),
      availableSchedule: z.array(
        z.object({
          day: z.enum([...weekDays] as [string, ...string[]], {
            required_error: "Day is required",
          }),
          startTime: z.string({
            required_error: "Start time is required",
          }),
          endTime: z.string({
            required_error: "End time is required",
          }),
        }),
      ),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const updateProviderValidationSchema = z.object({
  body: z.object({
    provider: z
      .object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        image: z.string().optional(),
        location: z.string().optional(),
        availableSchedule: z
          .array(
            z.object({
              day: z.enum([...weekDays] as [string, ...string[]]).optional(),
              startTime: z.string().optional(),
              endTime: z.string().optional(),
            }),
          )
          .optional(),
        isDeleted: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const ProviderValidations = {
  createProviderValidationSchema,
  updateProviderValidationSchema,
};
