import jwt, { JwtPayload } from "jsonwebtoken";
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
export const verifyToken = (
  token: string,
  secret: string,
): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (!err) {
        return resolve(decoded as JwtPayload);
      } else {
        return reject(new AppError(401, "Invalid token"));
      }
    });
  });
};
