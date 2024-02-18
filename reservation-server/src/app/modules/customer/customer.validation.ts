import { z } from "zod";

const createCustomerValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    customer: z.object({
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
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const updateCustomerValidationSchema = z.object({
  body: z.object({
    customer: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      image: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const CustomerValidations = {
  createCustomerValidationSchema,
  updateCustomerValidationSchema,
};
