import mongoose , { Schema, Document} from 'mongoose';

export type ChaletStatus = "pending" | "approved" | "rejected";
export interface ChaletDocument extends Document {
  ownerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  city: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
  status: ChaletStatus;
  isActive: boolean;
  rejectionReason?: string | null;
  averageRating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
const ChaletSchema = new Schema<ChaletDocument>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: { type: String, required: true },
    description: { type: String, required: true },

    city: {
      type: String,
      required: true,
      index: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
      index: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    rejectionReason: {
      type: String,
      default: null,
    },
    averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ChaletSchema.index({
  title: "text",
  description: "text",
});


export const Chalet = mongoose.model<ChaletDocument>(
  "Chalet",
  ChaletSchema
);
