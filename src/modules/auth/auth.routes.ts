import { Router } from "express";
import {
  getUserController,
  loginController,
  registerController,
} from "./auth.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", requireAuth, getUserController);

export default router;
