import { Router } from "express";
import {
  createUser,
  getUsers,
  //   updateUser,
  //   deleteUser,
} from "../controllers/userController";
import { errorHandler } from "../errorHandler";
// import { registerSchema } from "../schemas/userSchemas";
// import { validateData } from "../middleware/validationMiddleware";

const router: Router = Router();

router.get("/get", getUsers);
// router.post('/create', validateData(userRegistrationSchema), createUser);
// router.post('/register', registerSchema.parse(createUser));
router.post("/register", errorHandler(createUser));
// router.put("/update/:id", updateUser);
// router.delete("/delete/:id", deleteUser);

export default router;
