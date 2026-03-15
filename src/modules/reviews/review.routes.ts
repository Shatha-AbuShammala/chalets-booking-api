import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createReviewSchema } from "./review.validation.js";

export const reviewRouter = Router();

reviewRouter.post(
  "/",
  requireAuth,
  requireRole("customer"),
  validate(createReviewSchema),
  reviewController.createReview
);

reviewRouter.get(
  "/chalet/:chaletId",
  reviewController.getChaletReviews
);