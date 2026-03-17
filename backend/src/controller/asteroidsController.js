import catchAsync from "../middleware/catchAsync.js";
import {
  fetchAsteroids,
  fetchTodayAsteroids,
  fetchBrowseAsteroids,
  fetchAsteroidById,
} from "../services/asteroidsService.js";

export const getAsteroids = catchAsync(async (req, res) => {
  const { start_date, end_date } = req.query;
  const data = await fetchAsteroids(start_date, end_date);
  res.json({ success: true, data });
});

export const getTodayAsteroid = catchAsync(async (req, res) => {
  const data = await fetchTodayAsteroids();
  res.json({ success: true, data });
});

export const getAllAsteroids = catchAsync(async (req, res) => {
  const { page = 0, size = 20 } = req.query;
  const data = await fetchBrowseAsteroids(parseInt(page), parseInt(size));
  res.json({ success: true, data });
});

export const getAsteroidById = catchAsync(async (req, res) => {
  const data = await fetchAsteroidById(req.params.id);
  res.json({ success: true, data });
});
