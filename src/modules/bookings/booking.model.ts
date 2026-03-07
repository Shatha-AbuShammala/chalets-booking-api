import mongoose, { Schema, Document } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface BookingDocument extends Document {
  chaletId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<BookingDocument>(
  {
    chaletId: {
      type: Schema.Types.ObjectId,
      ref: "Chalet",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<BookingDocument>("Booking", BookingSchema);