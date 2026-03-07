import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ok, created, notFound, forbidden } from "../../utils/http.js";
import * as chaletService from "./chalet.service.js";

// POST /api/chalets — Owner only
export const createChalet = asyncHandler(async (req: Request, res: Response) => {
  const chalet = await chaletService.createChalet(req.user!.id, req.body);
  return created(res, chalet);
});

// GET /api/chalets — Public
export const listChalets = asyncHandler(async (req: Request, res: Response) => {
  const filters = {
    city: req.query.city as string | undefined,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    minCapacity: req.query.minCapacity ? Number(req.query.minCapacity) : undefined,
    maxCapacity: req.query.maxCapacity ? Number(req.query.maxCapacity) : undefined,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
  };
  const result = await chaletService.listChalets(filters);
  return ok(res, result);
});

// GET /api/chalets/:id — Public
export const getChaletById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return notFound(res, "Invalid ID");
  const chalet = await chaletService.getChaletById(id);
  if (!chalet) return notFound(res, "Chalet not found");
  return ok(res, chalet);
});

// PUT /api/chalets/:id — Owner only
export const updateChalet = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return notFound(res, "Invalid ID");

  const updatedChalet = await chaletService.updateChalet(id, req.user!.id, req.body);
  if (!updatedChalet) return notFound(res, "Chalet not found or not yours");

  return ok(res, updatedChalet);
});

// DELETE /api/chalets/:id — Owner only
export const deleteChalet = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return notFound(res, "Invalid ID");

  const chalet = await chaletService.deleteChalet(id, req.user!.id);
  if (!chalet) return notFound(res, "Chalet not found or not yours");

  return ok(res, { message: "Chalet deleted successfully" });
});

// PATCH /api/chalets/:id/status — Admin only
export const updateChaletStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return notFound(res, "Invalid ID");

  const { status, rejectionReason } = req.body;
  const chalet = await chaletService.updateChaletStatus(id, status, rejectionReason);
  if (!chalet) return notFound(res, "Chalet not found");

  return ok(res, chalet);
});

// GET /api/chalets/my — Owner only
export const getOwnerChalets = asyncHandler(async (req: Request, res: Response) => {
  const chalets = await chaletService.getOwnerChalets(req.user!.id);
  return ok(res, chalets);
});