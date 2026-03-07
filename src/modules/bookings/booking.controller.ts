import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ok, created, notFound } from "../../utils/http.js";
import * as bookingService from "./booking.service.js";

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingService.createBooking(req.user!.id, req.body);
  return created(res, booking);
});

export const getMyBookings = asyncHandler(async (req: Request, res: Response) => {
  const bookings = await bookingService.getMyBookings(req.user!.id);
  return ok(res, bookings);
});

export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return notFound(res, "Invalid ID");

  const booking = await bookingService.getBookingById(id, req.user!.id);
  if (!booking) return notFound(res, "Booking not found");

  return ok(res, booking);
});

export const cancelBooking = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return notFound(res, "Invalid ID");

  const booking = await bookingService.cancelBooking(id, req.user!.id);
  return ok(res, booking);
});

export const getChaletBookings = asyncHandler(async (req: Request, res: Response) => {
  const { chaletId } = req.params;
  if (!chaletId) return notFound(res, "Invalid ID");

  const bookings = await bookingService.getChaletBookings(chaletId, req.user!.id);
  return ok(res, bookings);
});