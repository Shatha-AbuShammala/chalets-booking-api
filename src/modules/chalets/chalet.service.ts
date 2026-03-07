import { Chalet, ChaletDocument } from "./chalet.model.js";
import mongoose from "mongoose";

interface ChaletFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  maxCapacity?: number;
  page: number;
  limit: number;
}

export const createChalet = async (
  ownerId: string,
  data: Partial<ChaletDocument>
) => {
  return await Chalet.create({ ...data, ownerId });
};

export const getChaletById = async (id: string) => {
  return await Chalet.findById(id);
};

export const updateChalet = async (
  id: string,
  ownerId: string,
  data: Partial<ChaletDocument>
) => {
  return await Chalet.findOneAndUpdate(
    { _id: id, ownerId },
    data,
    { new: true }
  );
};

export const deleteChalet = async (id: string, ownerId: string) => {
  return await Chalet.findOneAndDelete({ _id: id, ownerId });
};

export const listChalets = async (filters: ChaletFilters) => {
  const { city, minPrice, maxPrice, minCapacity, maxCapacity, page, limit } = filters;

 const query: Record<string, any> = {
  status: "approved",
  isActive: true,
};

  if (city) query.city = { $regex: city, $options: "i" };

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilter: { $gte?: number; $lte?: number } = {};
    if (minPrice !== undefined) priceFilter.$gte = minPrice;
    if (maxPrice !== undefined) priceFilter.$lte = maxPrice;
    query.pricePerNight = priceFilter;
  }

  if (minCapacity !== undefined || maxCapacity !== undefined) {
    const capacityFilter: { $gte?: number; $lte?: number } = {};
    if (minCapacity !== undefined) capacityFilter.$gte = minCapacity;
    if (maxCapacity !== undefined) capacityFilter.$lte = maxCapacity;
    query.capacity = capacityFilter;
  }

  const skip = (page - 1) * limit;
  const [chalets, total] = await Promise.all([
    Chalet.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Chalet.countDocuments(query),
  ]);

  return { chalets, total, page, limit };
};

export const updateChaletStatus = async (
  id: string,
  status: "approved" | "rejected",
  rejectionReason?: string
) => {
  return await Chalet.findByIdAndUpdate(
    id,
    { status, rejectionReason: status === "rejected" ? rejectionReason : null },
    { new: true }
  );
};

export const getOwnerChalets = async (ownerId: string) => {
  return await Chalet.find({ ownerId }).sort({ createdAt: -1 });
};