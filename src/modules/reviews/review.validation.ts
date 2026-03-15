import { z } from "zod";

export const createReviewSchema = z.object({
  chaletId: z.string().min(1),
  bookingId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10),
});