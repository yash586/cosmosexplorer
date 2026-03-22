import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apodRouter from "./routes/apod.js";
import discoverRouter from "./routes/discover.js";
import earthEventRouter from "./routes/earthEvents.js";
import asteroidRouter from "./routes/asteroid.js";

export const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
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

app.use(errorHandler);
