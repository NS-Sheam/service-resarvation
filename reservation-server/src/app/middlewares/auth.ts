import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredTypes: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //if token is not present
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route",
      );
    }
    let decoded;
    // verify token
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      console.log(error);

      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
    }
    const { userId, email, role } = decoded;

    // check if user exists
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // check if user is deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
    }

    // check if user type is allowed
    if (requiredTypes && !requiredTypes.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route",
      );
    }
    req.user = decoded;
    next();
  });
};

export default auth;
