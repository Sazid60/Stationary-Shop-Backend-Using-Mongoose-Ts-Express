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
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name Is Required'],
        unique: true,
    },
    brand: {
        type: String,
        required: [true, 'Brand Is Required'],
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number'],
        required: [true, 'Price Is Required'],
    },
    category: {
        type: String,
        enum: [
            'Writing',
            'Office Supplies',
            'Art Supplies',
            'Educational',
            ' Technology',
        ],
        required: [true, 'Product Category is Required'],
    },
    description: {
        type: String,
        required: [true, 'Description Is Required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity Is Required'],
        min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, versionKey: false });
productSchema.pre('find', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } }); // this is chaining with find query
    // this is filtering data and then the actual find method is working with the filtered data
    next();
});
productSchema.pre('findOne', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } }); // this is chaining with find query
    // this is filtering data and then the actual find method is working with the filtered data
    next();
});
productSchema.statics.isProductExist = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.Product.findOne({ name });
        return existingProduct;
    });
};
exports.Product = (0, mongoose_1.model)('Product', productSchema);
