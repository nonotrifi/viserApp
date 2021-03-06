import { Router} from "express";
import productController from "../controllers/product.controller";
import userMiddleware from "../middleware/user.middleware";

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.post('/',userMiddleware.isAuthenticated, userMiddleware.isProvider, productController.create);
router.put('/:id', userMiddleware.isAuthenticated, userMiddleware.isProvider,productController.update);
router.delete('/:id', userMiddleware.isAuthenticated, userMiddleware.isProvider, productController.delete);

// j'exporte router pour pouvoir l'utiliser dans index.ts ou je vais l'importer
export default router;
