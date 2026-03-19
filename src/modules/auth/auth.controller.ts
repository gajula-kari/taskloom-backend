import { Request, Response, NextFunction } from "express";
import { register } from "./auth.service";
import { AppError } from "../../utils/appError";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password) {
      throw new AppError("All fields are required", 400);
    }

    const result = await register(name, email, password);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
