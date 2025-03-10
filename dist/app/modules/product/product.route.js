"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// add product
router.post('/products', product_controller_1.ProductController.createProduct);
//  get all products
router.get('/products', product_controller_1.ProductController.getAllProducts);
// get single product
router.get('/products/:productId', product_controller_1.ProductController.getSingleProduct);
// update single product
router.put('/products/:productId', product_controller_1.ProductController.updateProduct);
// update single product
router.patch('/products/:productId', product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
