import { Router } from "express";
import { getAPODExplanation } from "../controller/aiController.js";

const router = Router();

router.post("/explain", getAPODExplanation);

export default router;
