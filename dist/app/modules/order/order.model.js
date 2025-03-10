"use strict";
// Creating a Schema corresponding to the document interface.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: false,
    },
    product: {
        type: String,
        required: [true, 'Id is Required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity Is Needed'],
        min: [1, 'Quantity must be greater than 0'],
    },
    totalPrice: {
        type: Number,
        required: false,
    },
}, { timestamps: true, versionKey: false });
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
