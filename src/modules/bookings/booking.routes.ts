import { Router } from "express";
import * as bookingController from "./booking.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createBookingSchema } from "./booking.validation.js";

const router = Router();

router.post("/", requireAuth, requireRole("customer"), validate(createBookingSchema), bookingController.createBooking);
router.get("/my", requireAuth, requireRole("customer"), bookingController.getMyBookings);
router.get("/:id", requireAuth, requireRole("customer"), bookingController.getBookingById);
router.patch("/:id/cancel", requireAuth, requireRole("customer"), bookingController.cancelBooking);

router.get("/chalet/:chaletId", requireAuth, requireRole("owner"), bookingController.getChaletBookings);

export { router as bookingRouter };