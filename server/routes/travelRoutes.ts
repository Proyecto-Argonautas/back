import { Router } from "express";
import {
  createTravel,
  getAllTravels,
  getTravels,
  getFilteredTravels
} from "../controllers/travelController";
import { errorHandler } from "../errorHandler";

const router: Router = Router();

// TODO entender como funciona los errorHandler
router.get("/all/:id", getAllTravels);
router.get("/all/filtered/:userId", getFilteredTravels);
router.post("/create", createTravel);
// router.get("/get", errorHandler(getTravelByTitle));

export default router;
