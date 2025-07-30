import { Router } from "express";
import {
  // createUser,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { errorHandler } from "../errorHandler";

// import { registerSchema } from "../schemas/userSchemas";
// import { validateData } from "../middleware/validationMiddleware";

const router: Router = Router();

router.get("/get", errorHandler(getUsers));
router.post("/register", registerUser);
router.patch("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
