import { Request, Response } from 'express';
import orderService from "../services/orders.service";

const orderController = {
    create: (req: Request, res: Response) => orderService.createOrder(req, res),
};

export default orderController;
