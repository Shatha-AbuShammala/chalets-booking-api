import express from "express";
import cors from "cors";
import helmet from "helmet";

import { healthRouter } from "./routes/health.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import { debugRouter } from "./routes/debug.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import chaletRouter from "./modules/chalets/chalet.routes.js";
import { bookingRouter } from "./modules/bookings/booking.routes.js";


export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(healthRouter);
  app.use(debugRouter);
  app.use("/api", authRouter);
  app.use("/api/chalets", chaletRouter);
  app.use("/api/bookings", bookingRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};