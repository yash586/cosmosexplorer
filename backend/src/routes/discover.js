import { Router } from "express";
import {
  getNasaImages,
  getAssetMetaData,
  getAssetCaptions,
  getAssetManifest,
} from "../controller/discoverController.js";

const router = Router();

router.get("/", getNasaImages);
router.get("/metadata/:nasaId", getAssetMetaData);
router.get("/captions/:nasaId", getAssetCaptions);
router.get("/asset/:nasaId", getAssetManifest);
export default router;
