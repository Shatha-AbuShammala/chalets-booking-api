import { Booking } from "./booking.model.js";
import { Chalet } from "../chalets/chalet.model.js";

export const createBooking = async (
  userId: string,
  data: { chaletId: string; checkIn: string; checkOut: string }
) => {
  const chalet = await Chalet.findById(data.chaletId);
  if (!chalet) throw new Error("Chalet not found");
  if (chalet.status !== "approved") throw new Error("Chalet is not available");

  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);

  if (checkIn >= checkOut) throw new Error("checkOut must be after checkIn");
  if (checkIn < new Date()) throw new Error("checkIn must be in the future");

  // Availability check
  const conflict = await Booking.findOne({
    chaletId: data.chaletId,
    status: { $ne: "cancelled" },
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn },
  });
  if (conflict) throw new Error("Chalet is not available for these dates");

  // Calculate total price
  const days = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = days * chalet.pricePerNight;

  const booking = await Booking.create({
    chaletId: data.chaletId,
    userId,
    checkIn,
    checkOut,
    totalPrice,
    status: "confirmed",
  });

  return booking;
};

export const getMyBookings = async (userId: string) => {
  return await Booking.find({ userId })
    .populate("chaletId", "title city pricePerNight images")
    .sort({ createdAt: -1 });
};

export const getBookingById = async (id: string, userId: string) => {
  return await Booking.findOne({ _id: id, userId }).populate(
    "chaletId",
    "title city pricePerNight"
  );
};

export const cancelBooking = async (id: string, userId: string) => {
  const booking = await Booking.findOne({ _id: id, userId });
  if (!booking) throw new Error("Booking not found");
  if (booking.status === "cancelled") throw new Error("Booking already cancelled");

  booking.status = "cancelled";
  await booking.save();
  return booking;
};

export const getChaletBookings = async (chaletId: string, ownerId: string) => {
  const chalet = await Chalet.findOne({ _id: chaletId, ownerId });
  if (!chalet) throw new Error("Chalet not found or not yours");

  return await Booking.find({ chaletId })
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
};