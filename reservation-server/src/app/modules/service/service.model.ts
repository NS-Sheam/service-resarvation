import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

serviceSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

serviceSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Service = model<TService>("Service", serviceSchema);
