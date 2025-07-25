import { Router } from "express";
import { getTravels, createTravel } from "../controllers/travelController";
import { errorHandler } from "../errorHandler";

const router: Router = Router();

router.get("/get", getTravels);
router.post("/create", errorHandler(createTravel));

export default router;
