import { Router } from 'express';
import { updateProducts } from '../controllers/product';

const router: Router = Router();

/* PRODUCT ROUTES */

router.put('/products/:productId', updateProducts);

export default router;
