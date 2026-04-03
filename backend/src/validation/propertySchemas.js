

import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(1, "Name is required and must be at least 1 character"),
  location: z.string().min(1, "Location is required and must be at least 1 character"),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
  landlordId :z.number().int().positive().optional(),
  description: z.string().optional(),
});

export const updatePropertySchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  location: z.string().min(1, "Location must be at least 1 character").optional(),
  categoryId: z.number().int().positive("Category ID must be a positive integer").optional(),
  landlordId: z.number().int().positive().optional(),
  description: z.string().optional(),
});

export const assignLandlordSchema = z.object({
  landlordId: z.number().int().positive("Landlord ID must be a positive integer"),
});
