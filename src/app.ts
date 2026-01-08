import express from "express";
import cors from "cors";
import helmet from "helmet";

import { healthRouter } from "./routes/health.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(healthRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
