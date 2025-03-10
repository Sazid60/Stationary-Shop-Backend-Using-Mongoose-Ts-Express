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
export const OrderServices = {
  createAnOrderInDB,
};
