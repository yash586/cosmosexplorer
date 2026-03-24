import axios from "axios";
import { getCache, setCache } from "../config/redis.js";

const IMAGE_BASE_URL = "https://images-api.nasa.gov";

/**
 * -----Search-------
 * Search NASA image and media library
 * Fetches images/videos from NASA Images API with optional filters
 * and caches the result in Redis.
 * @async
 * @param {Object} options Search options
 * @param {string} options.query Search keyword
 * @param {string} [options.mediaType] Media type (image, video, audio)
 * @param {number} options.page Page number
 * @param {number} options.pageSize Number of results per page
 * @param {number} [options.yearStart] Start year filter
 * @param {number} [options.yearEnd] End year filter
 * @param {string} [options.center] NASA center (e.g. JPL)
 * @returns {Promise<{
 *   total: number,
 *   page: number,
 *   pageSize: number,
 *   items: Array<{
 *     nasaId: string,
 *     title: string,
 *     description: string|null,
 *     date: string,
 *     mediaType: string,
 *     center: string|null,
 *     keywords: string[],
 *     photographer: string|null,
 *     thumbUrl: string|null
 *   }>
 * }>} Structured search results
 */
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

/**
 * ----- Asset MetaData ----------
 * Fetch metadata for a specific NASA asset
 * Retrieves detailed metadata JSON for a given NASA ID
 * and caches the result.
 * @async
 * @param {string} nasaId - NASA asset ID
 * @returns {Promise<{
 *   nasaId: string,
 *   location: string,
 *   metadata: any
 * }>} Asset metadata object
 */
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

/**
 * Fetch captions for a NASA asset
 * Returns subtitle/caption files (typically SRT format)
 * for video/audio assets.
 * @async
 * @param {string} nasaId - NASA asset ID
 * @returns {Promise<any>} Captions data (SRT or JSON)
 */
export const fetchAssetCaptions = async (nasaId) => {
  const cachedKey = `discover:caption:${nasaId}`;
  getCache(cachedKey);
  const response = await axios.get(`${IMAGE_BASE_URL}/captions/${nasaId}`);
  await setCache(cachedKey, response.data, 86400);
  return response.data;
};

/**
 * Fetch available asset versions (manifest)
 * Returns all available sizes and formats for a NASA asset,
 * including original, large, medium, small, and thumbnail versions.
 * @async
 * @param {string} nasaId - NASA asset ID
 * @returns {Promise<{
 *   nasaId: string,
 *   original: string|null,
 *   large: string|null,
 *   medium: string|null,
 *   small: string|null,
 *   thumb: string|null,
 *   all: string[]
 * }>} Asset file URLs grouped by size
 */

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
