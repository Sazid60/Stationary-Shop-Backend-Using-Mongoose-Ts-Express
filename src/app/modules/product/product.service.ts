// Create Product

import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
//  get single product
const getSingleStudentFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};
export const ProductService = {
  createProductInDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
