import axios from "axios";
import { config } from "../config/index.js";
import { redis } from "../config/redis.js";

const APOD_URL = `${config.nasa.baseUrl}/planetary/apod`;

const buildCacheKey = ({ date, startDate, endDate, count }) => {
  if (count) return `apod:random:${count}`;
  if (startDate) return `apod:range:${startDate}:${endDate || "today"}`;
  if (date) return `apod:date:${date}`;
  return `apod:today`;
};

const getTTL = ({ date, startDate, count }) => {
  if (count || startDate) return 3600;
  if (date) return 86400 * 7;
  return 3600;
};

export const fetchAPOD = async ({
  date,
  startDate,
  endDate,
  count,
  thumbs = true,
}) => {
  const cacheKey = buildCacheKey({ date, startDate, endDate, count });
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (redisError) {
    console.warn("Redis unavailable skipping cache:", redisError.message);
  }

  const params = { api_key: config.nasa.apiKey, thumbs };
  const extraParams = count
    ? { count }
    : startDate
      ? { start_date: startDate, ...(endDate && { end_date: endDate }) }
      : date
        ? { date }
        : {};

  const response = await axios.get(APOD_URL, {
    params,
    extraParams,
  });

  try {
    const ttl = getTTL({ date, startDate, count });
    await redis.set(cacheKey, JSON.stringify(response.data), "EX", ttl);
    console.log(`${cacheKey} for ${ttl}`);
  } catch (redisError) {
    console.warn("Redis cache write failed", redisError.message);
  }

  return response.data;
};
