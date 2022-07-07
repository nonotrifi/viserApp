import {Router} from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get('/', userController.getAll);
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

export default router;