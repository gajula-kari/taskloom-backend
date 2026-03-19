import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError";

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
