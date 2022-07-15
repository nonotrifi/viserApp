import { Router } from 'express';
import orderController from "../controllers/orders.controller";
import userMiddleware from '../middleware/user.middleware';

const router = Router();

router.post('/', userMiddleware.isAuthenticated, userMiddleware.isClient, orderController.create);

export default router;
