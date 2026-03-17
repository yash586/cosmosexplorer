import axios from "axios";
import { config } from "../config/index.js";
import { getCache, setCache } from "../config/redis.js";

const EONET_URL = "https://eonet.gsfc.nasa.gov/api/v3";
const DONKI_URL = `${config.nasa.baseUrl}/DONKI`;

// -----Helper - clean single event -------
const cleanEvent = (event) => ({
  id: event.id,
  title: event.title,
  description: event.description || null,
  status: event.status,
  category: event.categories?.[0]?.title || null,
  categoryId: event.categories?.[0]?.id || null,
  date: event.geometry?.[0]?.date || null,
  coordinates: event.geometry?.[0]?.coordinates || null,
  source: event.sources?.[0]?.url || null,
});

export const fetchEarthEvents = async ({
  status,
  limit,
  days,
  category,
  start,
  end,
}) => {
  const cachedKey = `earth:events:${status}:${category || "all"}:${days || "any"}:${start || "any"}:${end || "any"}`;
  await getCache(cachedKey);

  const params = {
    status,
    limit,
    ...(days && { days }),
    ...(category && { category }),
    ...(start && { start }),
    ...(end && { end }),
  };

  const response = await axios.get(`${EONET_URL}/events`, { params });
  const result = {
    total: response.data.events.length,
    events: response.data.events.map(cleanEvent),
  };
  await setCache(cachedKey, result, 1800);
  return result;
};

//----- single event ----
export const fetchEventById = async (eventId) => {
  const cachedKey = `earth:event:${eventId}`;
  await getCache(cachedKey);

  const response = await axios.get(`${EONET_URL}/events/${eventId}`);
  const result = cleanEvent(response.data);
  await setCache(cachedKey, result, 1800);
  return result;
};

// -----categories ------
export const fetchCategories = async () => {
  const cachedKey = "earth:categories";
  await getCache(cachedKey);

  const response = await axios.get(`${EONET_URL}/categories`);
  await setCache(cachedKey, response.data.categories, 86400);
  return response.data.categories;
};

//----- solar flares ----- (DONKI)
export const fetchSolarFlares = async (startDate, endDate) => {
  const cachedKey = `earth:flares:${startDate || "30Days"}:${endDate || "today"}`;
  await getCache(cachedKey);

  const params = {
    api_key: config.nasa.apiKey,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  const response = await axios.get(`${DONKI_URL}/FLR`, { params });
  const result = response.data.map((flare) => ({
    id: flare.flrID,
    startTime: flare.beginTime,
    peakTime: flare.peakTime,
    endTime: flare.endTime,
    classType: flare.classType,
    intensity: flare.classType?.charAt(0) || null,
    sourceLocation: flare.sourceLocation,
    instruments: flare.instruments?.map((i) => i.displayName) || [],
  }));
  await setCache(cachedKey, result, 3600);
  return result;
};

// ------ Geometric Storms (DONKI) ----------
export const fetchGeoStorms = async (startDate, endDate) => {
  const cachedKey = `earth:storms:${startDate || "30 Days"}:${endDate || "today"}`;
  await getCache(cachedKey);

  const params = {
    api_key: config.nasa.apiKey,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };
  const response = await axios.get(`${DONKI_URL}/GST`, { params });

  const result = response.data.map((storm) => ({
    id: storm.gstID,
    startTime: storm.startTime,
    kpIndex: storm.allKpIndex?.[0]?.kpIndex || null,
    severity:
      storm.allKpIndex?.[0]?.kpIndex >= 7
        ? "Severe"
        : storm.allKpIndex?.[0]?.kpIndex >= 5
          ? "Moderate"
          : "Minor",
  }));
  await setCache(cachedKey, result, 3600);
  return result;
};
