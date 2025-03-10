import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email('Invalid email format'),
  product: z.string().min(1, 'Product ID is required'),
  quantity: z.number().min(1, 'Quantity must be greater than 0'),
  totalPrice: z.number().optional(),
});
