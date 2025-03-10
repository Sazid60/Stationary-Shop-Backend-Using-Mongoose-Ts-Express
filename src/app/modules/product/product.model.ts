import { model, Schema } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
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
  },
  { timestamps: true, versionKey: false },
);

productSchema.statics.isProductExist = async function (name: string) {
  const existingProduct = await Product.findOne({ name });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
