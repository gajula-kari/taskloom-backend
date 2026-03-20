import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/appError";
import { createWorkspace } from "./workspace.service";

export const createWorkspaceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, desc, slug } = req.body;
    const user = req.user;

    // basic validation
    if (
      !name ||
      !slug ||
      !user ||
      !user.userId ||
      !name?.trim() ||
      !slug?.trim()
    ) {
      throw new AppError("All fields are required", 400);
    }

    const result = await createWorkspace(name, desc, user.userId, slug);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
