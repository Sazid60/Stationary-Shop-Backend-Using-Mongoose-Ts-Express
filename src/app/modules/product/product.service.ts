// Create Product

import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

export const ProductService = {
  createProductInDB,
};
