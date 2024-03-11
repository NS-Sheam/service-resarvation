import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";

export const createToken = (
  jwtPayload: {
    email: string;
    role: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new AppError(401, "Invalid token");
  }
};
