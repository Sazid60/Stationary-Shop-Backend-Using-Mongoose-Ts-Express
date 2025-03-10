import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

// add product
router.post('/products', ProductController.createProduct);

//  get all products
router.get('/products', ProductController.getAllProducts);

// get single product
router.get('/products/:productId', ProductController.getSingleProduct);
export const ProductRoutes = router;
