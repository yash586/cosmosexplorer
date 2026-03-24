import { COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";

export const EVENT_CONFIG = {
  wildfires: {
    label: "Wildfires",
    icon: ICONS.WILDFIRE,
    color: COLORS.DANGER,
  },
  severeStorms: {
    label: "Severe Storms",
    icon: ICONS.STORM,
    color: COLORS.ACCENT,
  },
  volcanoes: {
    label: "Volcanoes",
    icon: ICONS.VOLCANO,
    color: COLORS.AMBER,
  },
  floods: {
    label: "Floods",
    icon: ICONS.FLOOD,
    color: COLORS.SAFE,
  },
  seaIce: {
    label: "Sea Ice",
    icon: ICONS.SEA_ICE,
    color: COLORS.TEXT_PRIMARY,
  },
  drought: {
    label: "Drought",
    icon: ICONS.DROUGHT,
    color: COLORS.AMBER,
  },
  dustHaze: {
    label: "Dust & Haze",
    icon: ICONS.DUST,
    color: COLORS.TEXT_MUTED,
  },
  earthquakes: {
    label: "Earthquakes",
    icon: ICONS.EARTHQUAKE,
    color: COLORS.DANGER,
  },
  landslides: {
    label: "Landslides",
    icon: ICONS.LANDSLIDE,
    color: COLORS.AMBER,
  },
  default: {
    label: "Other",
    icon: ICONS.DEFAULT,
    color: COLORS.TEXT_MUTED,
  },
};

export const getEventConfig = (categoryId) =>
  EVENT_CONFIG[categoryId] || EVENT_CONFIG.default;
