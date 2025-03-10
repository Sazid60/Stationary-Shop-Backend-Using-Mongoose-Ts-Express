import { Request, Response } from 'express';
import { ProductService } from '../product/product.service';

import { orderValidationSchema } from './order.validation';
import { OrderService } from './order.service';

// 1. create an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParseData = orderValidationSchema.parse(orderData);
    // console.log(orderData);
    // checking if the product exists in database or not
    const product = await ProductService.getSingleProductFromDB(
      orderData.product,
    );
    // console.log(product);
    if (!product) {
      res.status(404).json({
        message: 'Product is Not Found',
        status: false,
      });
    } else if (product.quantity < orderData.quantity) {
      res.status(400).json({
        message: 'Insufficient Stock',
        status: false,
      });
    } else {
      // Calling Service Function To Create an order
      const result = await OrderService.createAnOrderInDB(zodParseData);
      res.status(200).json({
        message: 'Order Created successfully',
        status: true,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      message: 'Validation Failed',
      status: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

//  show all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrders();
    res.status(200).json({
      message: 'Orders Retrieved Successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'No Order Is Found',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    // Calling Service Function To Get Revenue
    const result = await OrderService.getRevenueFromDB();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Something went Wrong!',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getRevenue,
};
