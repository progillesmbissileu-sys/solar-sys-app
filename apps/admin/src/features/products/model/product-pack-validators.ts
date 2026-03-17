import z from 'zod';

export const createPackFormSchema = z.object({
  designation: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  // items: z.array(z.object({
  //   productId: z.string().min(1),
  //   quantity: z.number().min(1),
  // }))
  items: z.array(z.string()),
});

export const updatePackFormSchema = z.object({
  id: z.string().min(1),
  designation: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  items: z.array(z.string()),
});
