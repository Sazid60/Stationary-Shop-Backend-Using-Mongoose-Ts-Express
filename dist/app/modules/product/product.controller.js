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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParseData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductService.createProductInDB(zodParseData);
        res.status(200).json({
            message: 'Product created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Validation Failed',
            success: false,
            error: err.errors,
            stack: err.stack,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let result;
        if (searchTerm) {
            // Calling Service Function To get searched data
            result = yield product_service_1.ProductService.getAllSearchedProductsFromDB(searchTerm);
        }
        else {
            // Calling Service Function To Get All Products Data
            result = yield product_service_1.ProductService.getAllProductsFromDB();
        }
        if (result.length === 0) {
            res.status(404).json({
                message: 'No products found',
                status: true,
                data: [],
            });
        }
        else {
            res.status(200).json({
                message: 'Product Retrieved successfully',
                status: true,
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Something Went Wrong !',
            status: false,
            error: err.errors,
            stack: err.stack,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProductFromDB(productId);
        res.status(200).json({
            message: 'Product Retrieved Successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'No Product Is Found',
            success: false,
            error: err.errors,
            stack: err.stack,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProductData = req.body;
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.updateAProductInDB(productId, updatedProductData);
        res.status(200).json({
            message: 'Product updated successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Validation Failed',
            success: false,
            error: err.errors,
            stack: err.stack,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteAProductFromDB(productId);
        res.status(200).json({
            message: 'Product Deleted successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Something Went Wrong',
            success: false,
            error: err.errors,
            stack: err.stack,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
