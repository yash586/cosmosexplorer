import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apodRouter from "./routes/apod.js";
import discoverRouter from "./routes/discover.js";
import marsRouter from "./routes/mars.js";

export const app = express();
app.use(
  cors({
    origin: config.frontendUrl,
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "CosmosExplorer API running" });
});

app.use("/api/apod", apodRouter);

app.use("/api/discover", discoverRouter);

app.use("/api/mars", marsRouter);

app.use(errorHandler);
