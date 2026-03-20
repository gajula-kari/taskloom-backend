import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth//auth.routes";
import workspaceRoutes from "./modules/workspace/workspace.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/auth", authRoutes);
app.use("/workspace", workspaceRoutes);

app.use(errorHandler);

export default app;
