import Redis from "ioredis";
import { config } from "./index.js";

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  tls: config.redis.tls ? {} : undefined,
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
