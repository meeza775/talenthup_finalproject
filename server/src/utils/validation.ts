import { z } from 'zod';

const OrderSchema = z.object({
  customerName: z.string().min(2),
  address: z.string().min(5),
  phone: z.string().regex(/^\+?[\d\s-()]+$/),
  items: z.array(z.object({
    id: z.number(),
    quantity: z.number().min(1),
    price: z.number().positive(),
  })),
  totalAmount: z.number().positive(),
});

export const validateOrder = (data: unknown) => {
  return OrderSchema.parse(data);
};