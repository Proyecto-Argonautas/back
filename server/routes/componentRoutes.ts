import { Router } from "express";
import {
    // createUser,
    // createComponent,
    createResume
} from "../controllers/componentController";
// import { errorHandler } from "../errorHandler";

const router: Router = Router();

// router.get("/get", errorHandler(getUsers));
router.post("/create", createResume);

export default router;
