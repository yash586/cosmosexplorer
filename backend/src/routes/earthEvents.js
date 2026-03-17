import { Router } from "express";
import {
  getCategories,
  getEarthEvents,
  getEventById,
  getSolarFlares,
  getGeoStorms,
} from "../controller/earthEventController.js";

const router = Router();

router.get("/", getEarthEvents);
router.get("/categories", getCategories);
router.get("/flares", getSolarFlares);
router.get("/storms", getGeoStorms);
router.get("/:eventId", getEventById);
export default router;
