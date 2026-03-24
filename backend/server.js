/**
 * Entry point for the backend application where server gets started and initialized
 */
import { config } from "./src/config/index.js";
import { app } from "./src/app.js";
import { redis } from "./src/config/redis.js";

const startRedis = async () => {
  await redis.set("test", "Redis is working");
  const value = await redis.get("test");
  console.log(value);
};

const startServer = async () => {
  try {
    await startRedis();
    app.listen(config.port, () => {
      console.log(`Server running on Port: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
