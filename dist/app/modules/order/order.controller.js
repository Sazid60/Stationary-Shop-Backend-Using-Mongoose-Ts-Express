"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const product_service_1 = require("../product/product.service");
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
// 1. create an order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParseData = order_validation_1.orderValidationSchema.parse(orderData);
        // console.log(orderData);
        // checking if the product exists in database or not
        const product = yield product_service_1.ProductService.getSingleProductFromDB(orderData.product);
        // console.log(product);
        if (!product) {
            res.status(404).json({
                message: 'Product is Not Found',
                status: false,
            });
        }
        else if (product.quantity < orderData.quantity) {
            res.status(400).json({
                message: 'Insufficient Stock',
                status: false,
            });
        }
        else {
            // Calling Service Function To Create an order
            const result = yield order_service_1.OrderService.createAnOrderInDB(zodParseData);
            res.status(200).json({
                message: 'Order Created successfully',
                status: true,
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Validation Failed',
            status: false,
            error: err.errors,
            stack: err.stack,
        });
    }
});
//  show all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getAllOrders();
        res.status(200).json({
            message: 'Orders Retrieved Successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'No Order Is Found',
            success: false,
            error: err.errors,
            stack: err.stack,
        });
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Calling Service Function To Get Revenue
        const result = yield order_service_1.OrderService.getRevenueFromDB();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Something went Wrong!',
            status: false,
            error: err,
            stack: err.stack,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders,
    getRevenue,
};
