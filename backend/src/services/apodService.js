import axios from "axios";
import { config } from "../config/index.js";
import { getCache, setCache } from "../config/redis.js";

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
  getCache(cacheKey);

  const params = { api_key: config.nasa.apiKey, thumbs };
  const extraParams = count
    ? { count }
    : startDate
      ? { start_date: startDate, ...(endDate && { end_date: endDate }) }
      : date
        ? { date }
        : {};

  const response = await axios.get(APOD_URL, {
    params: { ...params, ...extraParams },
    extraParams,
  });

  const ttl = getTTL({ date, startDate, count });
  await setCache(cacheKey, response.data, ttl);
  return response.data;
};
