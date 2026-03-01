import z from 'zod';

export const productFormSchema = z.object({
  id: z.string().optional(),
  designation: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  categoryId: z.uuid(),
  brand: z.string().optional(),
  picture: z.file(),
  pictureTitle: z.string().optional(),
  pictureAlt: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
