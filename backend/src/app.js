import express from "express";
import cors from "cors";

export const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "CosmosExplorer API running" });
});
