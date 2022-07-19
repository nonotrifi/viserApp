import { Router } from 'express';
import orderController from "../controllers/orders.controller";
import userMiddleware from '../middleware/user.middleware';


const router = Router();

router.get('/', orderController.getAll);
router.get('/:id', orderController.getOne);
router.post('/', userMiddleware.isAuthenticated, userMiddleware.isClient, orderController.create);
router.put('/:id', userMiddleware.isAuthenticated, userMiddleware.isProvider, orderController.takeOrder);

export default router;
