import axios from "axios";
import { config } from "../config/index.js";

export const fetchMarsPhotos = async (rover = "curiosity", camera = null) => {
  // ✅ latest_photos → always returns most recent
  // → no sol number needed
  // → never 404 ✅
  const params = { api_key: config.nasa.apiKey };
  if (camera) params.camera = camera;

  const response = await axios.get(
    `${config.nasa.baseUrl}/mars-photos/api/v1/rovers/${rover}/latest_photos`,
    { params },
  );
  return response.data;
};
