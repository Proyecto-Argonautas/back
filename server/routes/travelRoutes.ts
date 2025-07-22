import { Router } from "express";
import { getTravels, createTravels } from "../controllers/travelController";

const router = Router();

router.get('/get', getTravels);
router.post('/create', createTravels);

export default router;