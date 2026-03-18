import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
