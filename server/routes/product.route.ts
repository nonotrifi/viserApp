import { Router} from "express";
import productController from "../controllers/product.controller";

const router = Router();

router.get('/', productController.getAll);
router.get('/:productId', productController.getOne);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);


export default router;
