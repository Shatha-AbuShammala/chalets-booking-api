import { Router } from "express";
import * as chaletController from "./chalet.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createChaletSchema, updateChaletSchema } from "./chalet.validation.js";

const router = Router();

// Public
router.get("/", chaletController.listChalets);
router.get("/:id", chaletController.getChaletById);

// Owner only
router.post("/", requireAuth, requireRole("owner"), validate(createChaletSchema), chaletController.createChalet);
router.get("/my", requireAuth, requireRole("owner"), chaletController.getOwnerChalets);
router.put("/:id", requireAuth, requireRole("owner"), validate(updateChaletSchema), chaletController.updateChalet);
router.delete("/:id", requireAuth, requireRole("owner"), chaletController.deleteChalet);

// Admin only
router.patch("/:id/status", requireAuth, requireRole("admin"), chaletController.updateChaletStatus);

export default router;