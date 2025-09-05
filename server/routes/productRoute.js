import { Router } from 'express';
import * as ProductController from '../controllers/productController.js';
import { validateProduct } from '../middlewares/productValidation.js';

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', validateProduct, ProductController.createProduct);
router.put('/:id', validateProduct, ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;