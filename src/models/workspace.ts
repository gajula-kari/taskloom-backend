import mongoose from "mongoose";

export interface IWorkspace extends Document {
  name: string;
  desc: string;
  createdBy: string;
  slug: string;
  isDeleted?: boolean;
  deletedAt: Date;
}

const workspaceSchema = new mongoose.Schema<IWorkspace>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  },
);

export const Workspace = mongoose.model<IWorkspace>(
  "Workspace",
  workspaceSchema,
);
