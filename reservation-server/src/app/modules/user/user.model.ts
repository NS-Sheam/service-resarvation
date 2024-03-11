import { Schema, model } from "mongoose";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";
const userSchema = new Schema<TUser, UserModel>(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["admin", "provider", "customer"],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  const userId = this._id;
  const isUserExist = await User.findOne({ _id: userId });
  if (isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User already exist");
  }

  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));

  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// checking if the password is changed after the token is issued
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimeStamp: Date,
  JWTTimestamp: number,
) {
  const passwordChangedAt = passwordChangedTimeStamp.getTime() / 1000;

  return passwordChangedAt > JWTTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);
