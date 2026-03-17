import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.log("Redis Error:", error);
});

export const getCache = async (cachedKey) => {
  try {
    const cached = await redis.get(cachedKey);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch (error) {
    console.warn("Redis unavailable", error.message);
    await redis.del(cachedKey);
    return null;
  }
};

export const setCache = async (cachedKey, result, ttl = 3600) => {
  try {
    await redis.set(cachedKey, JSON.stringify(result), "EX", ttl);
  } catch (error) {
    console.warn("Redis write failed", error.message);
  }
};

export const deleteCache = async (key) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.warn(`Cache delete failed for ${key}:`, error.message);
  }
};
