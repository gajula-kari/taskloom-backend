import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError";
import mongoose from "mongoose";

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (existingUser) {
    throw new AppError("User Already Exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    passwordHash: hashedPassword,
  });

  const token = jwt.sign(
    {
      userId: newUser._id,
      email: newUser.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    throw new AppError("Invalid credentials", 400);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordMatch) {
    throw new AppError("Invalid credentials", 400);
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const getUser = async (id: string, email: string) => {
  // const user = await User.findById(id);
  const user = await User.findOne({ _id: id, email });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
