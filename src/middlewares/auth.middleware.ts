import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError("Unauthorized", 401);

    if (!authHeader.startsWith("Bearer "))
      throw new AppError("Unauthorized", 401);

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch (error) {
    next(new AppError("Unauthorized", 401));
  }
};
