// Creating a Schema corresponding to the document interface.

import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
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
  },
  { timestamps: true, versionKey: false },
);

export const Order = model<TOrder>('Order', orderSchema);
