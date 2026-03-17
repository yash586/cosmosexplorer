import {
  fetchEarthEvents,
  fetchEventById,
  fetchCategories,
  fetchSolarFlares,
  fetchGeoStorms,
} from "../services/earthEventsService.js";
import catchAsync from "../middleware/catchAsync.js";

export const getEarthEvents = catchAsync(async (req, res) => {
  const { status = "open", limit = 20, days, category, start, end } = req.query;
  const data = await fetchEarthEvents({
    status,
    limit,
    days,
    category,
    start,
    end,
  });
  res.json({ success: true, data });
});

export const getEventById = catchAsync(async (req, res) => {
  const data = await fetchEventById(req.params.eventId);
  res.json({ success: true, data });
});

export const getCategories = catchAsync(async (req, res) => {
  const data = await fetchCategories();
  res.json({ success: true, data });
});

export const getSolarFlares = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const data = await fetchSolarFlares(startDate, endDate);
  res.json({ success: true, data });
});

export const getGeoStorms = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const data = await fetchGeoStorms(startDate, endDate);
  res.json({ success: true, data });
});
