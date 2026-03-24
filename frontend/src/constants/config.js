/**
 * CosmosExplorer App Configuration
 */
export const CONFIG = {
  // APOD
  APOD_MIN_DATE: "1995-06-16",
  APOD_MAX_DATE: new Date().toISOString().split("T")[0],

  // Asteroids
  ASTEROID_MAX_DAYS: 7,
  ASTEROID_PAGE_SIZE: 10,
  ASTEROID_DEFAULT_DAYS: 7,

  // Discover
  DISCOVER_PAGE_SIZE: 20,

  // Earth Events
  EVENTS_DEFAULT_LIMIT: 20,
  EVENTS_CACHE_TTL: 1800,

  // Quick topics
  QUICK_TOPICS: [
    "Mars",
    "Nebula",
    "Astronaut",
    "Earth",
    "Moon",
    "Rocket",
    "Galaxy",
    "Saturn",
    "Hubble",
    "Apollo",
  ],
};

export const CHART_TOOLTIP_STYLE = {
  backgroundColor: "#161B22",
  border: "1px solid #30363D",
  borderRadius: "8px",
  color: "#E6EDF3",
};

export const CHART_TICK_STYLE = {
  fill: "#8B949E",
  fontSize: 11,
};
