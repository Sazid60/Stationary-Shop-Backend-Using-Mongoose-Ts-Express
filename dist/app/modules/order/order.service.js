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
exports.OrderService = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createAnOrderInDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const productDetails = yield product_model_1.Product.findById(orderData.product);
    if (!productDetails) {
        throw new Error('Product Not Found');
    }
    const totalPrice = productDetails.price * orderData.quantity;
    const result = yield order_model_1.Order.create(Object.assign(Object.assign({}, orderData), { totalPrice }));
    if (result) {
        const updatedQuantity = productDetails.quantity - orderData.quantity;
        // this is the logic for decreasing the quantity and changing status while order is placed
        yield product_model_1.Product.findByIdAndUpdate(orderData.product, {
            $inc: { quantity: -orderData.quantity },
            $set: { inStock: updatedQuantity > 0 },
        }, { new: true });
    }
    return result;
});
// get a;ll orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield product_model_1.Product.find();
    return orders;
});
//  get revenue from db function
const getRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // this is the logic for going through all the documents and grabbing the price to calculate revenue
    const result = yield order_model_1.Order.aggregate([
        {
            $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
        },
        { $project: { _id: 0, totalRevenue: 1 } },
    ]);
    return result;
});
exports.OrderService = {
    createAnOrderInDB,
    getRevenueFromDB,
    getAllOrders,
};
