import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apodRouter from "./routes/apod.js";
import discoverRouter from "./routes/discover.js";
import earthEventRouter from "./routes/earthEvents.js";
import asteroidRouter from "./routes/asteroid.js";
import aiRouter from "./routes/ai.js";

export const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cosmosexplorer-zeta.vercel.app",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "CosmosExplorer API running" });
});

app.use("/api/apod", apodRouter);

app.use("/api/discover", discoverRouter);

app.use("/api/earth-events", earthEventRouter);

app.use("/api/asteroids", asteroidRouter);

app.use("/api/ai", aiRouter);

app.use(errorHandler);
