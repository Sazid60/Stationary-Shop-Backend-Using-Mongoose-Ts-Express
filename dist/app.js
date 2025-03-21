"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
// Parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', product_route_1.ProductRoutes);
app.use('/api', order_route_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server Is Running',
    });
});
exports.default = app;
