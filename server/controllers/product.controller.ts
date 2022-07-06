import Product from "../models/product.model";
import {Request, Response} from "express";

const productController = {
    getAll: async (req: Request, res: Response) => {
        console.log("req => " + req);
        const products = await Product.find();
        return res.json(products);
    },
    getOne: async (req: Request, res: Response) => {
      const product = await Product.findById(req.params.id);
      return res.json(product);
    },
    create: async (req: Request, res: Response) => {
        const product = new Product(req.body);
        await product.save();
        return res.json(product);
    },
};

export default productController;