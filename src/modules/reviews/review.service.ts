import { Review } from "./review.model.js";
import { Booking } from "../bookings/booking.model.js";
import { Chalet } from "../chalets/chalet.model.js";

export const createReview = async (
  userId: string,
  data: {
    chaletId: string;
    bookingId: string;
    rating: number;
    comment: string;
  }
) => {
  const booking = await Booking.findOne({
    _id: data.bookingId,
    userId,
    chaletId: data.chaletId,
    status: "confirmed",
  });
  if (!booking) throw new Error("No completed booking found for this chalet");

  const existing = await Review.findOne({ bookingId: data.bookingId });
  if (existing) throw new Error("You already reviewed this booking");

  const review = await Review.create({ ...data, userId });

  await updateChaletRating(data.chaletId);

  return review;
};

export const getChaletReviews = async (chaletId: string) => {
  return await Review.find({ chaletId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};

const updateChaletRating = async (chaletId: string) => {
  const reviews = await Review.find({ chaletId });
  if (reviews.length === 0) return;

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Chalet.findByIdAndUpdate(chaletId, {
    averageRating: Math.round(avg * 10) / 10,
    reviewsCount: reviews.length,
  });
};