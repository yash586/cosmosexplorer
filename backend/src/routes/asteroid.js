import {
  getAsteroids,
  getTodayAsteroid,
  getAllAsteroids,
  getAsteroidById,
} from "../controller/asteroidsController.js";
import { Router } from "express";

const router = Router();

router.get("/", getAsteroids);
router.get("/today", getTodayAsteroid);
router.get("/browse", getAllAsteroids);
router.get("/:id", getAsteroidById);

export default router;
