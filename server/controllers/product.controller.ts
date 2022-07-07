import Product from "../models/product.model";
import {Request, Response} from "express";

const productController = {
    getAll: async (req: Request, res: Response) => {
        console.log("req => " + req);
        const products = await Product.find();
        return res.json(products);
    },
    getOne: async (req: Request, res: Response) => {
        console.log("Hello");
        const products = await Product.findById(req.params.productId); 
        console.log('products ->', products)
        
        return res.json(products);
    },
    create: async (req: Request, res: Response) => {
        const product = new Product(req.body);
        await product.save();
        return res.json(product);
    },
    update: async (req: Request, res: Response) => {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });
        return res.json(product);
    },
    delete: async (req: Request, res: Response) => {
        await Product.findByIdAndDelete(req.params.id);
        return res.json({message: 'Deleted'});
    },
};

export default productController;