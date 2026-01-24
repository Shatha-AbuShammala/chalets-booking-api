import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ok } from "../../utils/http.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "./auth.schemas.js";
import * as AuthService from "./auth.service.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

export const authRouter = Router();

const authLimiter = rateLimit({ windowMs: 60_000, max: 20 });

authRouter.post(
  "/auth/register",
  authLimiter,
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await AuthService.register(req.body);
    res.status(201).json(
      ok({
        user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
        accessToken,
        refreshToken,
      })
    );
  })
);

authRouter.post(
  "/auth/login",
  authLimiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await AuthService.login(req.body);
    res.json(
      ok({
        user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
        accessToken,
        refreshToken,
      })
    );
  })
);

authRouter.post(
  "/auth/refresh",
  authLimiter,
  validate(refreshTokenSchema),
  asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await AuthService.refresh(req.body);
    res.json(ok({ accessToken, refreshToken }));
  })
);

authRouter.post(
  "/auth/logout",
  requireAuth,
  asyncHandler(async (req, res) => {
    await AuthService.logout(req.user!.id);
    res.json(ok({ message: "Logged out" }));
  })
);
