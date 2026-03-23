import { explainAPOD } from "../services/aiService.js";
import catchAsync from "../middleware/catchAsync.js";

export const getAPODExplanation = catchAsync(async (req, res) => {
  const { title, explanation } = req.body;

  if (!title || !explanation) {
    return res.status(400).json({
      success: false,
      message: "Title and explanation are required",
    });
  }

  const data = await explainAPOD(title, explanation);
  return res.json({ success: true, data });
});
