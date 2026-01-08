import { Router } from "express";
import { ok } from "../utils/http.js";
import { env } from "../config/env.js";

export const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
  res.json(
    ok({
      status: "ok",
      env: env.NODE_ENV,
    })
  );
});
