import { Request, Response } from 'express';
import orderService from "../services/orders.service";
import userService from "../services/user.service";

const orderController = {
    getAll:(req: Request, res: Response) => {  return orderService.getOrders(res)},
    getOne: (req: Request, res: Response) => { return orderService.getOrder(req, res) },
    create: (req: Request, res: Response) => { return orderService.createOrder(req, res)},
    takeOrder: (req: Request, res: Response) => { return orderService.takeOrder(req, res)},
};

export default orderController;
