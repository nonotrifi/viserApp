import { Request, Response } from 'express';
import Order from '../models/order.model';

// Good Practice : Mettre un "I" devant une interface
interface IProduct {
    name: string,
    price: number,
    description: string,
    clientId: string
}

const orderService = {
    async createOrder(req: Request, res: Response) {
        // products : { product: Product; quantity: number }[]
        // curly brackets 
        // extraire l'objet user de req
        const clientId = req.user.id;
        // req -> il existe une propriété 'user'
        // same que const user = req.user
        // 
        const products = req.body.products as IProduct[];
        if (products.length === 0) {
            res.status(400).json({ message: 'The body cannot be empty of products' })
        }
        // req.body contient product
        // req { user, ..., body : { product }}
        const order = new Order({
            products,
            clientId,
            
        });
        try {
            await order.save();
            res.status(201).json({
                message: 'Order created successfully',
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Error creating order',
            });
        }
    },
    /* async takeOrder(req, res) {
        order.update({..., providerId: req.user.id) <== ce user a pour role 'provider'
    }*/
};

export default orderService;
