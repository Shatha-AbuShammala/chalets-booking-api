import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { healthRouter } from "./routes/health.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import { debugRouter } from "./routes/debug.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import chaletRouter from "./modules/chalets/chalet.routes.js";
import { bookingRouter } from "./modules/bookings/booking.routes.js";
import { reviewRouter } from "./modules/reviews/review.routes.js";

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: { message: "Too many requests, please try again later" } },
});

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(globalLimiter);
  app.use(express.json({ limit: "10kb" }));
  app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Chalets Booking API ",
    version: "1.0.0",
    health: "/health",
    docs: "https://github.com/Shatha-AbuShammala/chalets-booking-api"
  });
});

  app.use(healthRouter);
  app.use(debugRouter);
  app.use("/api", authRouter);
  app.use("/api/chalets", chaletRouter);
  app.use("/api/bookings", bookingRouter);
  app.use("/api/reviews", reviewRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};