import axiosInstance from "../utils/axiosInstance";

// ─── APOD ─────────────────────────────────────
export const getAPOD = (params = {}) =>
  axiosInstance.get("/api/apod", { params });

// ─── ASTEROIDS ────────────────────────────────
export const getAsteroids = (params = {}) =>
  axiosInstance.get("/api/asteroids", { params });

export const getTodayAsteroids = () =>
  axiosInstance.get("/api/asteroids/today");

export const browseAsteroids = (params = {}) =>
  axiosInstance.get("/api/asteroids/browse", { params });

export const getAsteroidById = (id) =>
  axiosInstance.get(`/api/asteroids/${id}`);

// ─── DISCOVER ─────────────────────────────────
export const searchNASAImages = (params = {}) =>
  axiosInstance.get("/api/discover", { params });

export const getAssetManifest = (nasaId) =>
  axiosInstance.get(`/api/discover/asset/${nasaId}`);

export const getAssetMetadata = (nasaId) =>
  axiosInstance.get(`/api/discover/metadata/${nasaId}`);

// ─── EARTH EVENTS ─────────────────────────────
export const getEarthEvents = (params = {}) =>
  axiosInstance.get("/api/earth-events", { params });

export const getEventCategories = () =>
  axiosInstance.get("/api/earth-events/categories");

export const getSolarFlares = (params = {}) =>
  axiosInstance.get("/api/earth-events/flares", { params });

export const getGeoStorms = (params = {}) =>
  axiosInstance.get("/api/earth-events/storms", { params });

export const getEventById = (id) =>
  axiosInstance.get(`/api/earth-events/${id}`);

// ----- AI endpoint --------
export const explainAPOD = (title, explanation) =>
  axiosInstance.post("/api/ai/explain", { title, explanation });
