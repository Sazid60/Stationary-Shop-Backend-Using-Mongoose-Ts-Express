import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productValidationSchema.parse(productData);
    const result = await ProductService.createProductInDB(zodParseData);
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Validation Failed',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    let result;
    if (searchTerm) {
      // Calling Service Function To get searched data
      result = await ProductService.getAllSearchedProductsFromDB(
        searchTerm as string,
      );
    } else {
      // Calling Service Function To Get All Products Data
      result = await ProductService.getAllProductsFromDB();
    }

    if (result.length === 0) {
      res.status(404).json({
        message: 'No products found',
        status: true,
        data: [],
      });
    } else {
      res.status(200).json({
        message: 'Product Retrieved successfully',
        status: true,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Something Went Wrong !',
      status: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductFromDB(productId);
    res.status(200).json({
      message: 'Product Retrieved Successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'No Product Is Found',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProductData = req.body;
    const { productId } = req.params;

    const result = await ProductService.updateAProductInDB(
      productId,
      updatedProductData,
    );

    res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Validation Failed',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteAProductFromDB(productId);

    res.status(200).json({
      message: 'Product Deleted successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Something Went Wrong',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
