// Create Product

import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductInDB = async (productData: TProduct) => {
  const result = await Product.create(productData);

  if (await Product.isProductExist(productData.name)) {
    throw new Error('Product Already Exist');
  }
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getAllSearchedProductsFromDB = async (searchTerm: string) => {
  // used regex is used here to match partially with the data
  const result = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { type: { $regex: searchTerm, $options: 'i' } },
    ],
  });
  return result;
};

//  get single product
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

//  update a single product
const updateAProductInDB = async (
  productId: string,
  updates: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(productId, updates, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const ProductService = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateAProductInDB,
  getAllSearchedProductsFromDB,
};
