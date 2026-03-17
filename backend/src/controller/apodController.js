import { fetchAPOD } from "../services/apodService.js";
import catchAsync from "../middleware/catchAsync.js";

export const getAPOD = catchAsync(async (req, res) => {
  const { date, start_date, end_date, count, thumbs } = req.query;
  const data = await fetchAPOD({
    date,
    startDate: start_date,
    endDate: end_date,
    count: count ? parseInt(count) : null,
    thumbs: thumbs !== "false",
  });
  res.json({ success: true, data });
});
