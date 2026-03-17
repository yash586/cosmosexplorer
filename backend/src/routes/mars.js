import { Router } from "express";
import { getMarsPhotos } from "../controller/marsController.js";

const router = Router();

router.get("/", getMarsPhotos);

export default router;
