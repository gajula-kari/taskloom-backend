import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  },
);

export const User = mongoose.model<IUser>("User", userSchema);
