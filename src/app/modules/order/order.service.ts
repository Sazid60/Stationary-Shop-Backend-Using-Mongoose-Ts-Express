import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createAnOrderInDB = async (orderData: TOrder) => {
  const productDetails = await Product.findById(orderData.product);

  if (!productDetails) {
    throw new Error('Product Not Found');
  }

  const totalPrice: number = productDetails.price * orderData.quantity;
  const result = await Order.create({ ...orderData, totalPrice });

  if (result) {
    const updatedQuantity: number =
      productDetails.quantity - orderData.quantity;

    // this is the logic for decreasing the quantity and changing status while order is placed
    await Product.findByIdAndUpdate(
      orderData.product,
      {
        $inc: { quantity: -orderData.quantity },
        $set: { inStock: updatedQuantity > 0 },
      },
      { new: true },
    );
  }
  return result;
};

// get a;ll orders
const getAllOrders = async () => {
  const orders = await Product.find();
  return orders;
};
//  get revenue from db function
const getRevenueFromDB = async () => {
  // this is the logic for going through all the documents and grabbing the price to calculate revenue
  const result = await Order.aggregate([
    {
      $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
    },
    { $project: { _id: 0, totalRevenue: 1 } },
  ]);
  return result;
};

export const OrderService = {
  createAnOrderInDB,
  getRevenueFromDB,
  getAllOrders,
};
