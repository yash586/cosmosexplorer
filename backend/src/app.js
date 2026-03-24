/**
 * Main Express application setup
 * @module app
 */
import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apodRouter from "./routes/apod.js";
import discoverRouter from "./routes/discover.js";
import earthEventRouter from "./routes/earthEvents.js";
import asteroidRouter from "./routes/asteroid.js";
import aiRouter from "./routes/ai.js";

/**
 * Express application instance
 * @type {import('express').Express}
 */
export const app = express();

/**
 * Configure CORS middleware
 * @function
 * @name configureCors
 * @description Enables cross-origin requests for allowed frontend URLs
 */
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

/**
 * Middleware to parse incoming JSON requests
 * @function
 * @name jsonParser
 */
app.use(express.json());

/**
 * Health check endpoint
 * @function
 * @name healthCheck
 * @route GET /health
 * @param {import('express').Request} req Express request object
 * @param {import('express').Response} res Express response object
 * @returns {{status: string, message: string}} JSON response indicating API status
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "CosmosExplorer API running" });
});

/**
 * APOD (Astronomy Picture of the Day) routes
 * @function
 * @name apodRoutes
 * @route /api/apod
 * @description Handles NASA APOD related endpoints
 */
app.use("/api/apod", apodRouter);

/**
 * Discover routes
 * @function
 * @name discoverRoutes
 * @route /api/discover
 * @description Handles space discovery endpoints
 */
app.use("/api/discover", discoverRouter);

/**
 * Earth Events routes
 * @function
 * @name earthEventRoutes
 * @route /api/earth-events
 * @description Handles natural Earth events data (e.g. NASA EONET)
 */
app.use("/api/earth-events", earthEventRouter);

/**
 * Asteroid routes
 * @function
 * @name asteroidRoutes
 * @route /api/asteroids
 * @description Handles asteroid-related data
 */
app.use("/api/asteroids", asteroidRouter);

/**
 * AI routes
 * @function
 * @name aiRoutes
 * @route /api/ai
 * @description Handles AI-powered endpoints
 */
app.use("/api/ai", aiRouter);

/**
 * Global error handling middleware
 * @function
 * @name errorHandlingMiddleware
 * @param {Error} err - Error object
 * @param {import('express').Request} req Express request
 * @param {import('express').Response} res Express response
 * @param {import('express').NextFunction} next Next middleware function
 */
app.use(errorHandler);
