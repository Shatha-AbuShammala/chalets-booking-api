import { z } from "zod";

export const createChaletSchema = z.object({
  title: z.string().min(3, "Title too short"),
  description: z.string().min(10, "Description too short"),
  city: z.string().min(2),
  pricePerNight: z.number().min(0),
  capacity: z.number().min(1),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
});

export const updateChaletSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  city: z.string().min(2).optional(),
  pricePerNight: z.number().min(0).optional(),
  capacity: z.number().min(1).optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  isActive: z.boolean().optional(),
});