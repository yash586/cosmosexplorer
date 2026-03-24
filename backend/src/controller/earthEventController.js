import {
  fetchEarthEvents,
  fetchEventById,
  fetchCategories,
  fetchSolarFlares,
  fetchGeoStorms,
} from "../services/earthEventsService.js";
import catchAsync from "../middleware/catchAsync.js";

/**
 * @async
 * Get Earth natural events
 * @param {Object} req.query Query parameters
 * @param {string} [req.query.status="open"] Event status (open/closed)
 * @param {number} [req.query.limit=20] Number of results to return
 * @param {number} [req.query.days] Filter events from last N days
 * @param {string} [req.query.category] Event category (e.g. wildfire, storm)
 * @param {string} [req.query.start] Start date (ISO format)
 * @param {string} [req.query.end] End date (ISO format)
 * @returns {Promise<void>} JSON response with Earth events data
 */
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

/**
 * @async
 * Get Single Earth event
 * @param {Object} req.params parameters
 * @param {string | Number} req.params.eventId - Event Id
 * @returns {Promise<void>} JSON response with Earth events data
 */
export const getEventById = catchAsync(async (req, res) => {
  const data = await fetchEventById(req.params.eventId);
  res.json({ success: true, data });
});

/**
 * @async
 * Fetches all the categories
 * @returns {Promise<void>} JSON response with Earth events data
 */
export const getCategories = catchAsync(async (req, res) => {
  const data = await fetchCategories();
  res.json({ success: true, data });
});

/**
 * @async
 * Get Solar Flares by start date and end date
 * @param {Object} req.query Query parameters
 * @returns {Promise<void>} JSON response with solar flares
 */
export const getSolarFlares = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const data = await fetchSolarFlares(startDate, endDate);
  res.json({ success: true, data });
});

/**
 * @async
 * Get Geo storms by start date and end date
 * @param {Object} req.query Query parameters
 * @returns {Promise<void>} JSON response with storm data
 */
export const getGeoStorms = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;
  const data = await fetchGeoStorms(startDate, endDate);
  res.json({ success: true, data });
});
