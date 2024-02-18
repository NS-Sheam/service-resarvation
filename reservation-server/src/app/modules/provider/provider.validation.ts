import { z } from "zod";

const createProviderValidationSchema = z.object({
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
    isDeleted: z.boolean().default(false),
  }),
});

const updateProviderValidationSchema = z.object({
  provider: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProviderValidations = {
  createProviderValidationSchema,
  updateProviderValidationSchema,
};
