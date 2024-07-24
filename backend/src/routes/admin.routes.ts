import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';

const router: Router = Router();

router.get('/', ProductController.getProducts);
router.get('/count', ProductController.getProductsCount);

export default router;
