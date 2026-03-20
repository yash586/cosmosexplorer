export const EVENT_CONFIG = {
  wildfires: {
    label: "Wildfires",
    icon: "🔥",
    color: "#FF4444",
  },
  severeStorms: {
    label: "Severe Storms",
    icon: "🌪️",
    color: "#00B4FF",
  },
  volcanoes: {
    label: "Volcanoes",
    icon: "🌋",
    color: "#FFB347",
  },
  floods: {
    label: "Floods",
    icon: "🌊",
    color: "#00D4AA",
  },
  seaIce: {
    label: "Sea Ice",
    icon: "🧊",
    color: "#E6EDF3",
  },
  drought: {
    label: "Drought",
    icon: "☀️",
    color: "#FFB347",
  },
  dustHaze: {
    label: "Dust & Haze",
    icon: "🌫️",
    color: "#8B949E",
  },
  manmade: {
    label: "Manmade",
    icon: "🏭",
    color: "#8B949E",
  },
  snow: {
    label: "Snow",
    icon: "❄️",
    color: "#E6EDF3",
  },
  landslides: {
    label: "Landslides",
    icon: "⛰️",
    color: "#FFB347",
  },
  default: {
    label: "All",
    icon: "🌐",
    color: "#8B949E",
  },
};

export const getEventConfig = (categoryId) => {
  return EVENT_CONFIG[categoryId] || EVENT_CONFIG.default;
};
