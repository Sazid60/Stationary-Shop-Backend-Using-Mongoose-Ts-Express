"use strict";
// Create Product
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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const createProductInDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield product_model_1.Product.isProductExist(productData.name)) {
        throw new Error('Product Already Exist');
    }
    const result = yield product_model_1.Product.create(productData);
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getAllSearchedProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // used regex is used here to match partially with the data
    const result = yield product_model_1.Product.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { brand: { $regex: searchTerm, $options: 'i' } },
            { type: { $regex: searchTerm, $options: 'i' } },
        ],
    });
    return result;
});
//  get single product
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById({ _id: productId });
    return result;
});
//  update a single product
const updateAProductInDB = (productId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, updates, {
        new: true,
        runValidators: true,
    });
    return result;
});
//  delete a product
const deleteAProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = product_model_1.Product.findByIdAndUpdate({ _id: productId }, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.ProductService = {
    createProductInDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateAProductInDB,
    getAllSearchedProductsFromDB,
    deleteAProductFromDB,
};
