import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController";
import { userRegistrationSchema } from "../schemas/userSchemas";
import { validateData } from "../middleware/validationMiddleware";

const router = Router();

router.get('/get', getUsers);
// router.post('/create', validateData(userRegistrationSchema), createUser);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;