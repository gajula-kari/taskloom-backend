import { Router } from "express";
import { createWorkspaceController } from "./workspace.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", requireAuth, createWorkspaceController);

export default router;
