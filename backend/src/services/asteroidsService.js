import axios from "axios";
import { config } from "../config/index.js";
import { getCache, setCache } from "../config/redis.js";

const NEOWS_URL = `${config.nasa.baseUrl}/neo/rest/v1`;

const getCloseApproach = (closeApproach) =>
  closeApproach.close_approach_data?.[0] || null;

const cleanAsteroid = (data) => {
  const approach = getCloseApproach(data);
  return {
    id: data.id,
    name: data.name,
    hazardous: data.is_potentially_hazardous_asteroid,
    diameter_km: parseFloat(
      data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3),
    ),
    miss_distance_km: approach
      ? parseFloat(parseFloat(approach.miss_distance.kilometers).toFixed(0))
      : null,
    velocity_kmh: approach
      ? parseFloat(
          parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0),
        )
      : null,
    orbiting_body: approach?.orbiting_body || null,
    nasa_url: data.nasa_jpl_url,
    close_approach_date: approach.close_approach_date,
  };
};

const processAsteroids = (rawData) => {
  const allAsteroids = Object.values(rawData.near_earth_objects).flat();
  const cleaned = allAsteroids.map(cleanAsteroid);

  // stat cards
  const withApproach = cleaned.filter(
    (distance) => distance.miss_distance_km !== null,
  );
  const hazardous = cleaned.filter((data) => data.hazardous);
  const closet =
    withApproach.length > 0
      ? cleaned.reduce((min, currVal) => {
          (currVal.miss_distance_km < min ? min.miss_distance_km : min,
            Infinity);
        })
      : null;

  const avgVelocity =
    withApproach.length > 0
      ? Math.round(
          cleaned.reduce((sum, currVal) => sum + currVal.velocity_kmh, 0) /
            cleaned.length,
        )
      : null;

  // daily count bar chart
  const dailyMap = {};
  cleaned.forEach((data) => {
    const date = data.close_approach_date;
    if (!dailyMap[date]) {
      dailyMap[date] = { date, total: 0, hazardous: 0 };
      dailyMap[date].total++;
    }
    if (data.hazardous) {
      dailyMap[date].hazardous++;
    }
  });

  // top 10 largest bar chart
  const topData = [...cleaned]
    .sort((a, b) => b.diameter_km - a.diameter_km)
    .slice(0, 10);
  return {
    stats: {
      total: rawData.element_count,
      hazardous: hazardous.length,
      closetApproach: closet,
      avgVelocity,
    },
    dailyCount: Object.values(dailyMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    ),
    top10Largest: topData,
    asteroids: cleaned,
  };
};

// ------- Feed Date range --------
export const fetchAsteroids = async (startDate, endDate) => {
  const today = new Date().toISOString().split("T")[0];
  const weekAhead = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const start = startDate || today;
  const end = endDate || weekAhead;

  const cachedKey = `asteroid:feed:${start}:${end}`;
  await getCache(cachedKey);

  const response = await axios.get(`${NEOWS_URL}/feed`, {
    params: { api_key: config.nasa.apiKey, start_date: start, end_date: end },
  });
  const result = processAsteroids(response.data);
  await setCache(cachedKey, result, 3600);
  return result;
};

export const fetchTodayAsteroids = async () => {
  const cachedKey = `asteroid:today`;
  await getCache(cachedKey);

  const response = await axios.get(`${NEOWS_URL}/feed/today`, {
    params: { api_key: config.nasa.apiKey, detailed: false },
  });

  const result = processAsteroids(response.data);
  await setCache(cachedKey, result, 3600);
  return result;
};

export const fetchBrowseAsteroids = async (page, size) => {
  const cachedKey = `asteroid:browse:page${page}:size${size}`;
  await getCache(cachedKey);

  const response = await axios.get(`${NEOWS_URL}/neo/browse`, {
    params: { api_key: config.nasa.apiKey, page, size },
  });

  const result = {
    total: response.data.page.total_elements,
    totalPages: response.data.page.total_pages,
    page: response.data.page.number,
    asteroids: response.data.near_earth_objects.map(cleanAsteroid),
  };

  await setCache(cachedKey, result, 3600);
  return result;
};

export const fetchAsteroidById = async (asteroidId) => {
  const cachedKey = `asteroid:id${asteroidId}`;
  await getCache(cachedKey);

  const response = await axios.get(`${NEOWS_URL}/neo/${asteroidId}`, {
    params: { api_key: config.nasa.apiKey },
  });

  await setCache(cachedKey, response.data, 86400);
  return response.data;
};
