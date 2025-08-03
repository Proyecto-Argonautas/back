import { Router } from "express";
import {
    // createUser,
    createComponent,
} from "../controllers/componentController";
// import { errorHandler } from "../errorHandler";

const router: Router = Router();

// router.get("/get", errorHandler(getUsers));
router.post("/create", createComponent);

export default router;
