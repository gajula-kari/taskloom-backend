import mongoose from "mongoose";

export interface IWorkspaceMember extends Document {
  workspaceId: mongoose.Types.ObjectId;
  role: "admin" | "member";
  userId: mongoose.Types.ObjectId;
  invitedBy: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const workspaceMemberSchema = new mongoose.Schema<IWorkspaceMember>({
  workspaceId: {
    type: mongoose.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true,
    default: "member",
  },
  invitedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export const WorkspaceMember = mongoose.model<IWorkspaceMember>(
  "WorkspaceMember",
  workspaceMemberSchema,
);
