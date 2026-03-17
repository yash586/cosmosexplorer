import { Router } from "express";
import { getAPOD } from "../controller/apodController.js";

const router = Router();

router.get("/", getAPOD);

export default router;
