import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ok, created, notFound } from "../../utils/http.js";
import * as reviewService from "./review.service.js";

export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await reviewService.createReview(req.user!.id, req.body);
  return created(res, review);
});

export const getChaletReviews = asyncHandler(async (req: Request, res: Response) => {
  const { chaletId } = req.params;
  if (!chaletId) return notFound(res, "Invalid ID");

  const reviews = await reviewService.getChaletReviews(chaletId);
  return ok(res, reviews);
});