import { Router } from 'express';
import { fetchProducts } from '../controllers/product';

const router: Router = Router();

/* PRODUCT ROUTES */

router.get('/products/', fetchProducts);

export default router;
