import { z } from "zod";

export const createBookingSchema = z.object({
  chaletId: z.string().min(1),
  checkIn: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "Invalid checkIn date",
  }),
  checkOut: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "Invalid checkOut date",
  }),
});