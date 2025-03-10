import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();
// create an Order route
router.post('/orders', OrderController.createOrder);
export const OrderRoutes = router;
