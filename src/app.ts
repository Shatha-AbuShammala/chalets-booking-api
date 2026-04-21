import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { healthRouter } from "./routes/health.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import { debugRouter } from "./routes/debug.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import chaletRouter from "./modules/chalets/chalet.routes.js";
import { bookingRouter } from "./modules/bookings/booking.routes.js";
import { reviewRouter } from "./modules/reviews/review.routes.js";
import { swaggerSpec } from "./config/swagger.js";

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

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "Chalets Booking API — Docs",
      customCss: `.swagger-ui .topbar { background-color: #1a1a2e; } .swagger-ui .topbar .download-url-wrapper { display: none; }`,
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        tryItOutEnabled: true,
        filter: true,
      },
    })
  );
 
  // Swagger
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
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