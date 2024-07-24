import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';

const router: Router = Router();

router.get('/', ProductController.getProducts);

export default router;
