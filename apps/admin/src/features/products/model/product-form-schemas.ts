import z from 'zod';

export const createProductSchema = z.object({
  id: z.string().optional(),
  designation: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive().min(1),
  categoryId: z.uuid(),
  brand: z.string().optional(),
  images: z.array(z.file(), 'Images is required').min(1),
  pictureTitle: z.string().optional(),
  pictureAlt: z.string().optional(),
});

export const updateProductSchema = z.object({
  id: z.string().min(1),
  designation: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive().min(1),
  categoryId: z.uuid(),
  brand: z.string().optional(),
});

export type ProductUpdateFormValues = z.infer<typeof updateProductSchema>;

export type ProductFormValues = z.infer<typeof createProductSchema>;
