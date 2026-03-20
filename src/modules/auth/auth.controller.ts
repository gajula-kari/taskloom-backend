import { Request, Response, NextFunction } from "express";
import { getUser, login, register } from "./auth.service";
import { AppError } from "../../utils/appError";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (
      !name ||
      !email ||
      !password ||
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
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

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password || !email?.trim() || !password?.trim()) {
      throw new AppError("All fields are required", 400);
    }

    const result = await login(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    // basic validation
    if (!user || !user.email || !user.userId) {
      throw new AppError("All fields are required", 400);
    }

    const result = await getUser(user.userId, user.email);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
