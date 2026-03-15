import dotenv from "dotenv";
dotenv.config();
import { app } from "./src/app.js";
import { redis } from "./src/config/redis.js";

const PORT = process.env.PORT || 5000;

const startRedis = async () => {
  await redis.set("test", "Redis is working");
  const value = await redis.get("test");
  console.log(value);
};

const startServer = async () => {
  try {
    await startRedis();
    app.listen(PORT, () => {
      console.log(`Server running on Port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
