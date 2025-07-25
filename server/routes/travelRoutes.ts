import { Router } from "express";
import { getTravels, createTravel, getTravelByTitle } from "../controllers/travelController";
import { errorHandler } from "../errorHandler";

const router: Router = Router();

router.get("/allTravels", getTravels);
router.post("/create", errorHandler(createTravel));
router.get('/get', errorHandler(getTravelByTitle));

export default router;
