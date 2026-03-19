import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// ─── APOD ─────────────────────────────────────
export const getAPOD = (params = {}) => api.get("/api/apod", { params });

// ─── ASTEROIDS ────────────────────────────────
export const getAsteroids = (params = {}) =>
  api.get("/api/asteroids", { params });

export const getTodayAsteroids = () => api.get("/api/asteroids/today");

export const browseAsteroids = (params = {}) =>
  api.get("/api/asteroids/browse", { params });

export const getAsteroidById = (id) => api.get(`/api/asteroids/${id}`);

// ─── DISCOVER ─────────────────────────────────
export const searchNASAImages = (params = {}) =>
  api.get("/api/discover", { params });

export const getAssetManifest = (nasaId) =>
  api.get(`/api/discover/asset/${nasaId}`);

export const getAssetMetadata = (nasaId) =>
  api.get(`/api/discover/metadata/${nasaId}`);

// ─── EARTH EVENTS ─────────────────────────────
export const getEarthEvents = (params = {}) =>
  api.get("/api/earth-events", { params });

export const getEventCategories = () => api.get("/api/earth-events/categories");

export const getSolarFlares = (params = {}) =>
  api.get("/api/earth-events/flares", { params });

export const getGeoStorms = (params = {}) =>
  api.get("/api/earth-events/storms", { params });

export const getEventById = (id) => api.get(`/api/earth-events/${id}`);
