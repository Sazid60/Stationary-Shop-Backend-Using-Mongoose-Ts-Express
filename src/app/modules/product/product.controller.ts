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
    const result = await ProductService.getAllStudentsFromDB();
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
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleStudentFromDB(productId);
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

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
