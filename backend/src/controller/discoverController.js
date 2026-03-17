import {
  fetchNasaImages,
  fetchAssetMetadata,
  fetchAssetCaptions,
  fetchAssetManifest,
} from "../services/discoverService.js";
import catchAsync from "../middleware/catchAsync.js";

export const getNasaImages = catchAsync(async (req, res) => {
  const {
    query = "space",
    media_type,
    page = 1,
    page_size = 20,
    year_start,
    year_end,
    center,
  } = req.query;
  const data = await fetchNasaImages({
    query,
    mediaType: media_type,
    page: parseInt(page),
    pageSize: parseInt(page_size),
    yearStart: year_start,
    yearEnd: year_end,
    center,
  });
  res.json({ success: true, data });
});

export const getAssetMetaData = catchAsync(async (req, res) => {
  const data = await fetchAssetMetadata(req.params.nasaId);
  res.json({ success: true, data });
});

export const getAssetCaptions = catchAsync(async (req, res) => {
  const data = await fetchAssetCaptions(req.params.nasaId);
  res.json({ success: true, data });
});

export const getAssetManifest = catchAsync(async (req, res) => {
  const data = await fetchAssetManifest(req.params.nasaId);
  res.json({ success: true, data });
});
