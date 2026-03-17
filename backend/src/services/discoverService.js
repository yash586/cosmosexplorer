import axios from "axios";
import { redis } from "../config/redis.js";

const IMAGE_BASE_URL = "https://images-api.nasa.gov";

// -----Search-------

export const fetchNasaImages = async ({
  query,
  mediaType,
  page,
  pageSize,
  yearStart,
  yearEnd,
  center,
}) => {
  const cachedKey = `discover:search:${query}:${mediaType || "any"}:${yearStart || "any"}:${yearEnd || "any"}:page${page}`;
  getCache(cachedKey);

  const params = {
    q: query,
    ...(mediaType && { media_type: mediaType }),
    page,
    page_size: pageSize,
    ...(yearStart && { year_start: yearStart }),
    ...(yearEnd && { year_end: yearEnd }),
    ...(center && { center }),
  };

  const response = await axios.get(`${IMAGE_BASE_URL}/search`, { params });
  const collection = response.data.collection;

  const result = {
    total: collection.metadata.total_hits,
    page,
    pageSize,
    items: collection.items.map((item) => ({
      nasaId: item.data[0].nasa_id,
      title: item.data[0].title,
      description: item.data[0].description || null,
      date: item.data[0].date_created,
      mediaType: item.data[0].media_type,
      center: item.data[0].center || null,
      keywords: item.data[0].keywords || [],
      photographer: item.data[0].photographer || null,
      thumbUrl: item.links?.[0]?.href || null,
    })),
  };

  await setCache(cachedKey, result, 3600);
  return result;
};

//----- Asset MetaData ----------
export const fetchAssetMetadata = async (nasaId) => {
  const cachedKey = `discover:metadata:${nasaId}`;
  getCache(cachedKey);
  const response = await axios.get(`${IMAGE_BASE_URL}/metadata/${nasaId}`);
  const metaDataUrl = response.data.location;
  const encodedUrl = encodeURI(metaDataUrl);
  const metaDataResponse = axios.get(encodedUrl);
  const result = {
    nasaId,
    location: metaDataUrl,
    metadata: metaDataResponse.data,
  };
  await setCache(cachedKey, result, 86400);
  return result;
};

// ---- Asset Captions ----
// returns srt videos
export const fetchAssetCaptions = async (nasaId) => {
  const cachedKey = `discover:caption:${nasaId}`;
  getCache(cachedKey);
  const response = await axios.get(`${IMAGE_BASE_URL}/captions/${nasaId}`);
  await setCache(cachedKey, response.data, 86400);
  return response.data;
};

// -------Asset Manifest-------
// returns all available sizes/versions of an asset

export const fetchAssetManifest = async (nasaId) => {
  const cachedKey = `discover:asset:${nasaId}`;
  getCache(cachedKey);
  const response = await axios.get(`${IMAGE_BASE_URL}/asset/${nasaId}`);
  const items = response.data.collection.items;
  const result = {
    nasaId,
    original: items.find((i) => i.href.includes("orig"))?.href || null,
    large: items.find((i) => i.href.includes("large"))?.href || null,
    medium: items.find((i) => i.href.includes("medium"))?.href || null,
    small: items.find((i) => i.href.includes("small"))?.href || null,
    thumb: items.find((i) => i.href.includes("thumb"))?.href || null,
    all: items.map((i) => i.href),
  };
  await setCache(cachedKey, result, 86400);
  return result;
};

async function getCache(cachedKey) {
  try {
    const cached = await redis.get(cachedKey);
    if (cached) {
      return JSON.parse(cachedKey);
    }
  } catch (error) {
    console.warn("Redis unavailable", error.message);
  }
}

async function setCache(cachedKey, result, ttl) {
  try {
    await redis.set(cachedKey, JSON.stringify(result), "EX", ttl);
  } catch (error) {
    console.warn("Redis write failed", error.message);
  }
}
