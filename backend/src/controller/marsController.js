import { fetchMarsPhotos } from "../services/marsService.js";

export const getMarsPhotos = async (req, res, next) => {
  try {
    // ✅ removed sol — not needed anymore
    const { rover = "curiosity", camera } = req.query;
    const data = await fetchMarsPhotos(rover, camera);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
