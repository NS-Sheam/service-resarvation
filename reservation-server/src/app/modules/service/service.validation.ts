import { z } from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    provider: z.string(),
    pricePerHour: z.number(),
    images: z.array(z.string()),
    isDeleted: z.boolean().default(false),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    provider: z.string().optional(),
    pricePerHour: z.number().optional(),
    images: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const ServiceValidations = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
