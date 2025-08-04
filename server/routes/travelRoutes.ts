import { Router } from "express";
import {
  createTravel,
  getAllTravels,
  // getTravelByTitle,
  getTravels,
} from "../controllers/travelController";
import { errorHandler } from "../errorHandler";

const router: Router = Router();

// TODO entender como funciona los errorHandler
router.get("/allTravels", getAllTravels);
router.post("/create", createTravel);
// router.get("/get", errorHandler(getTravelByTitle));

export default router;
