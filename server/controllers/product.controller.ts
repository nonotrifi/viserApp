import {Request, Response} from "express";
import productService from "../services/products.service";


const productController = {
    getAll: (req: Request, res: Response) => { return productService.getProducts(res)},
    getOne: (req: Request, res: Response) => { return productService.getProduct(req, res) },
    create: (req: Request, res: Response) => { return productService.createProduct(req, res)},
    update: (req: Request, res: Response) => { return productService.updateProduct(req, res)},
    delete: (req: Request, res: Response) => { return productService.deleteProduct(req, res)},
};

export default productController;

// pq ici on a req, res alors que dans getProducts que res ?
// pq pas asynchrone ? psk c'est le résultat est dores et dejé retourner donc pas besoin de fonction asynchrone