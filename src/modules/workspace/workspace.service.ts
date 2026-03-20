//create

import mongoose from "mongoose";
import { Workspace } from "../../models/workspace";
// import { WorkspaceMember } from "../../models/workspaceMember";
import { AppError } from "../../utils/appError";
import { WorkspaceMember } from "../../models/workspaceMember";

export const createWorkspace = async (
  name: string,
  desc: string,
  createdBy: string,
  slug: string,
) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const existing = await Workspace.findOne({ slug });

    if (existing) {
      throw new AppError("Workspace slug already exists", 400);
    }

    const newWorkspace = await Workspace.create(
      [
        {
          name,
          desc,
          slug,
          createdBy,
        },
      ],
      { session },
    );

    const newWorkspaceMember = await WorkspaceMember.create(
      [
        {
          workspaceId: newWorkspace[0]._id,
          role: "admin",
          userId: createdBy,
          joinedAt: new Date(),
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return {
      workspace: {
        id: newWorkspace[0]._id,
        name: newWorkspace[0].name,
        desc: newWorkspace[0].desc,
        createdBy: newWorkspace[0].createdBy,
        slug: newWorkspace[0].slug,
      },
      role: newWorkspaceMember[0].role,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

//get

export const getWorkspace = async () => {};

//update

export const updateWorkspace = async () => {};

//delete

export const deleteWorkspace = async () => {};
